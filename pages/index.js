import Head from 'next/head';
import React from 'react';

import Comments from '../components/Comments/index';
import Layout from '../components/Layout';
import CommentsProvider from '../context/CommentsContext';
import apiClient from '../helpers/api/client';

export async function getServerSideProps() {
  let comments, currentUser;
  try {
    const { data } = await apiClient.get('/api/comments');
    const response = await apiClient.get('/api/users/current');
    currentUser = {
      ...response.data,
      id: response.data._id,
    };
    if (!Array.isArray(data)) {
      throw 'Not an array';
    }
    comments = data;
  } catch (e) {
    comments = [];
  }

  return { props: { comments, currentUser } };
}

export default function Home({ comments, currentUser }) {
  return (
    <Layout currentUser={currentUser}>
      <div className="flex flex-col pt-0 md:pt-10">
        <Head>
          <title>Interactive Comment Section</title>
          <meta name="description" content="Frontendmentor challenge, interactive comment secion" />
          <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
        </Head>

        <CommentsProvider initialData={comments}>
          <Comments list={comments} />
        </CommentsProvider>
      </div>
    </Layout>
  );
}
