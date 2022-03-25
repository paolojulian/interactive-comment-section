import { createContext, useContext, useState } from 'react';
import apiClient from '../helpers/api/client';
import useApi from '../hooks/useApi';

const CommentsContext = createContext({
  comments: [],
  addCommentApi: {
    data: {},
    request: () => {},
    isLoading: false,
    isError: false,
  },
  deleteCommentApi: {
    data: {},
    request: () => {},
    isLoading: false,
    isError: false,
  },
  setComments: () => {},
});

const CommentsProvider = ({ initialData, children }) => {
  const [comments, setComments] = useState(initialData);

  const addCommentApi = useApi(async (comment) => {
    const data = { comment }
    const response = await apiClient.post('/api/comments/add', data);

    if (response.ok) {
      setComments([...comments, response.data.comment]);
    }

    return response;
  });

  const deleteCommentApi = useApi(async (id) => {
    const response = await apiClient.delete(`/api/comments/${id}`);
    if (response.ok) {
      setComments([...comments.filter(comment => Number(comment.id) !== Number(id))]);
    }

    return response;
  });

  return (
    <CommentsContext.Provider value={{ comments, addCommentApi, deleteCommentApi, setComments }}>
      {children}
    </CommentsContext.Provider>
  );
};

const useCommentsContext = () => {
  return useContext(CommentsContext);
};

export { CommentsContext, useCommentsContext };
export default CommentsProvider;
