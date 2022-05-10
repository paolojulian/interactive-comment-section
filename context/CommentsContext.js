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
  updateReplyApi: { ...useApiProps },
  voteApi: { ...useApiProps },
  voteReplyApi: { ...useApiProps },
  setComments: () => {},
});

const CommentsProvider = ({ initialData, children }) => {
  const [comments, setComments] = useState(initialData);

  const addCommentApi = useApi(async (content) => {
    const data = { content };
    const response = await apiClient.post('/api/comments', data);

    if (response.ok) {
      setComments([...comments, response.data]);
    }

    return response;
  });

  const deleteCommentApi = useApi(async (id) => {
    const response = await apiClient.delete(`/api/comments/${id}`);
    if (response.ok) {
      setComments([...comments.filter((comment) => comment._id !== id)]);
    }

    return response;
  });

  const updateCommentApi = useApi(async (id, payload) => {
    const response = await apiClient.put(`/api/comments/${id}`, payload);
    if (!response.ok) {
      return response;
    }

    const commentToUpdate = comments.find((comment) => comment._id === id);
    if (commentToUpdate && response.data.content) {
      commentToUpdate.content = response.data.content
    }

    return response;
  });

  const addReplyApi = useApi(async (id, payload) => {
    const response = await apiClient.post(`/api/comments/${id}/replies`, payload);
    if (response.ok) {
      const commentToUpdate = comments.find((comment) => comment._id === id);
      commentToUpdate.replies.push(response.data);
    }

    return response;
  });

  const deleteReplyApi = useApi(async (id, replyId) => {
    const response = await apiClient.delete(`/api/comments/${id}/replies/${replyId}`);
    if (!response.ok) return response;

    const commentToUpdate = comments.find((comment) => comment.id === id);
    commentToUpdate.replies.forEach((reply, i) => {
      if (reply.id === replyId) {
        commentToUpdate.replies.splice(i, 1);
      }
    });

    return response;
  });

  const updateReplyApi = useApi(async (id, replyId, payload) => {
    const response = await apiClient.put(`/api/comments/${id}/replies/${replyId}`, payload);
    if (!response.ok) return response;

    const commentToUpdate = comments.find((comment) => comment.id === id);
    const replyToUpdate = commentToUpdate.replies.find((reply) => reply.id === replyId);
    replyToUpdate.content = payload.content;

    return response;
  });

  const voteApi = useApi(async (id, payload) => {
    const commentToUpdate = comments.find((comment) => comment.id === id);
    const votedTemp = commentToUpdate.voted;
    commentToUpdate.score += payload.voted;
    commentToUpdate.voted += payload.voted;

    const response = await apiClient.put(`/api/comments/${id}`, payload);
    if (!response.ok) {
      commentToUpdate.score -= payload.voted;
      commentToUpdate.voted = votedTemp;
    }

    return response;
  });

  const voteReplyApi = useApi(async (id, replyId, payload) => {
    const commentToUpdate = comments.find((comment) => comment.id === id);
    const replyToUpdate = commentToUpdate.replies.find((reply) => reply.id === replyId);
    const votedTemp = replyToUpdate.voted;
    replyToUpdate.score += payload.voted;
    replyToUpdate.voted += payload.voted;

    const response = await apiClient.put(`/api/comments/${id}/replies/${replyId}`, payload);
    if (!response.ok) {
      replyToUpdate.score -= payload.voted;
      replyToUpdate.voted = votedTemp;
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
        updateReplyApi,
        voteApi,
        voteReplyApi,
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
