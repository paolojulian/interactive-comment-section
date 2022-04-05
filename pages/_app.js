import App from 'next/app';
import UserProvider from '../context/UserContext';
import apiClient from '../helpers/api/client';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  if (!pageProps.currentUser) {
    return <>404</>;
  }

  return (
    <UserProvider initialData={pageProps.currentUser}>
      <Component {...pageProps} />
    </UserProvider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const response = await apiClient.get('/api/users/current');
  const currentUser = {
    ...response.data,
    id: response.data._id,
  };

  const props = { ...appProps, pageProps: { currentUser } };

  return props;
};

export default MyApp;
