import Head from 'next/head';
import React, { useCallback } from 'react';

import Comments from '../components/Comments/index';
import { useUserContext } from '../context/UserContext';

export default function Home() {
  const userContext = useUserContext();
  const [list, setList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchListAsync = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/posts');
      const { comments, currentUser } = await response.json();
      setTimeout(() => {
        setIsLoading(false);
        setList([...comments]);
        userContext.login(currentUser);
      }, 1000);
    } catch (e) {
      console.log(e);
    }
  }, []);

  React.useEffect(() => {
    fetchListAsync();
  }, [fetchListAsync]);

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

      <Comments list={list} isLoading={isLoading} />
    </div>
  );
}
