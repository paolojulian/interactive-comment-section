import UserProvider from '../context/UserContext';

const Layout = ({ children, currentUser }) => {
  return <UserProvider initialData={currentUser}>{children}</UserProvider>;
};

export default Layout;
