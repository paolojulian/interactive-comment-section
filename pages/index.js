import Head from 'next/head';
import React from 'react';

import Comments from '../components/Comments/index';
import CommentsProvider from '../context/CommentsContext';
import { useUserContext } from '../context/UserContext';
import apiClient from '../helpers/api/client';

export async function getServerSideProps() {
  const { data: comments } = await apiClient.get('/api/comments');
  const { data: currentUser } = await apiClient.get('/api/users/current');

  return { props: { comments, currentUser } };
}

export default function Home({ comments, currentUser }) {
  const userContext = useUserContext();

  React.useEffect(() => {
    userContext.setUser(currentUser)
  }, []);

  return (
    <div className='flex flex-col pt-10'>
      <Head>
        <title>Interactive Comment Section</title>
        <meta
          name='description'
          content='Frontendmentor challenge, interactive comment secion'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/images/favicon-32x32.png'
        />
      </Head>

      <CommentsProvider initialData={comments}>
        <Comments list={comments} />
      </CommentsProvider>
    </div>
  );
}
