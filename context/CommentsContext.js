import { createContext, useContext, useState } from 'react';
import apiClient from '../helpers/api/client';
import useApi, { useApiProps } from '../hooks/useApi';

const CommentsContext = createContext({
  comments: [],
  addCommentApi: { ...useApiProps },
  deleteCommentApi: { ...useApiProps },
  updateCommentApi: { ...useApiProps },
  addReplyApi: { ...useApiProps },
  deleteReplyApi: { ...useApiProps },
  setComments: () => {},
});

const CommentsProvider = ({ initialData, children }) => {
  const [comments, setComments] = useState(initialData);

  const addCommentApi = useApi(async (comment) => {
    const data = { comment };
    const response = await apiClient.post('/api/comments/add', data);

    if (response.ok) {
      setComments([...comments, response.data.comment]);
    }

    return response;
  });

  const deleteCommentApi = useApi(async (id) => {
    const response = await apiClient.delete(`/api/comments/${id}`);
    if (response.ok) {
      setComments([...comments.filter((comment) => Number(comment.id) !== Number(id))]);
    }

    return response;
  });

  const updateCommentApi = useApi(async (id, payload) => {
    const response = await apiClient.put(`/api/comments/${id}`, payload);
    if (response.ok) {
      const commentToUpdate = comments.find((comment) => comment.id === id);
      commentToUpdate.content = payload.content;
    }

    return response;
  });

  const addReplyApi = useApi(async (id, payload) => {
    const response = await apiClient.post(`/api/comments/${id}/replies`, payload);
    if (response.ok) {
      const commentToUpdate = comments.find((comment) => comment.id === id);
      commentToUpdate.replies.push(response.data);
    }

    return response;
  });

  const deleteReplyApi = useApi(async (id, replyId) => {
    const response = await apiClient.delete(`/api/comments/${id}/replies/${replyId}`);
    if (response.ok) {
      const commentToUpdate = comments.find((comment) => comment.id === id);
      commentToUpdate.replies.forEach((reply, i) => {
        if (reply.id === replyId) {
          commentToUpdate.replies.splice(i, 1);
        }
      });
    }

    return response;
  });

  return (
    <CommentsContext.Provider
      value={{
        comments,
        addCommentApi,
        deleteCommentApi,
        updateCommentApi,
        addReplyApi,
        deleteReplyApi,
        setComments,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
};

const useCommentsContext = () => {
  return useContext(CommentsContext);
};

export { CommentsContext, useCommentsContext };
export default CommentsProvider;
