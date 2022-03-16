import { createContext, useContext, useState } from 'react';

const initialData = {
  id: null,
  username: null,
  image: { webp: null, png: null },
};

const UserContext = createContext({
  user: initialData,
  setUser: () => {},
  loginAsync: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(initialData);

  const loginAsync = async () => {
    try {
      const response = await fetch('/api/users/current');
      const { id, username, image } = await response.json();
      setUser(() => ({
        id,
        username,
        image,
      }));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, loginAsync }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  return useContext(UserContext);
};

export { UserContext, useUserContext };
export default UserProvider;
