import { createContext, useContext, useState } from 'react';

const initialData = {
  id: null,
  username: null,
  image: { webp: null, png: null },
};

const UserContext = createContext({
  user: initialData,
  setUser: () => {},
});

const UserProvider = ({ initialData, children }) => {
  const [user, setUser] = useState(initialData);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  return useContext(UserContext);
};

export { UserContext, useUserContext };
export default UserProvider;
