import Head from 'next/head';
import React from 'react';

import Comments from '../components/Comments/index';
import CommentsProvider from '../context/CommentsContext';
import apiClient from '../helpers/api/client';

export async function getServerSideProps() {
  let comments;
  try {
    const { data } = await apiClient.get('/api/comments');
    if (!Array.isArray(data)) {
      throw 'Not an array';
    }
    comments = data;
  } catch (e) {
    comments = [];
  }

  return { props: { comments } };
}

export default function Home({ comments }) {
  return (
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
  );
}
