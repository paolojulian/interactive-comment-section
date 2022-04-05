import React from 'react';
import UserProvider from '../context/UserContext';

function PrivateRoutes(props, pageProps) {
  console.log(pageProps);
  return (
    <UserProvider>
      {props.children}
    </UserProvider>
  );
}

export async function getServerSideProps() {
  const response = await apiClient.get('/api/users/current');
  con

  return { props: { currentUser: response.data } };
}

export default PrivateRoutes;