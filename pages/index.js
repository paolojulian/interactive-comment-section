import Head from 'next/head';
import React from 'react';

import Comments from '../components/Comments/index';
import { useUserContext } from '../context/UserContext';
import { domain } from '../helpers/domain';

export async function getServerSideProps() {
  const commentsResponse = await fetch(`${domain}/api/comments`);
  const comments = await commentsResponse.json();
  const currentUserResponse = await fetch(`${domain}/api/users/current`);
  const currentUser = await currentUserResponse.json();

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

      <Comments list={comments} />
    </div>
  );
}
