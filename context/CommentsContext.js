import { createContext, useContext, useState } from 'react';
import apiClient from '../helpers/api/client';

const initialData = {
  id: null,
  username: null,
  image: { webp: null, png: null },
};

const CommentsContext = createContext({
  user: initialData,
  setUser: () => {},
  loginAsync: () => {},
});

const CommentsProvider = ({ children }) => {
  const [comments, setComments] = useState([]);

  const addComment = async () => {
    const data = { comment };
    setIsLoading(true);
    await apiClient.post('/api/comments/add', data);
    setIsLoading(false);
  };

  return (
    <CommentsContext.Provider value={{ comments, addComment, setComments }}>
      {children}
    </CommentsContext.Provider>
  );
};

const useCommentsContext = () => {
  return useContext(CommentsContext);
};

export { CommentsContext, useCommentsContext };
export default CommentsProvider;
