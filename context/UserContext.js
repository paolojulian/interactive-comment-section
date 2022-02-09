import { createContext, useContext, useState } from 'react';

const initialData = {
  username: 'test',
  image: '',
};

const UserContext = createContext({
  user: initialData,
  login: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(initialData);

  const login = ({ username, image }) => {
    setUser(() => ({
      username,
      image
    }));
  }

  return (
    <UserContext.Provider value={{ user, login }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  return useContext(UserContext);
};

export { UserContext, useUserContext };
export default UserProvider;
