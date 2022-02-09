import Head from 'next/head';
import Comments from '../components/Comments/index';

export default function Home() {
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

      <Comments />
    </div>
  );
}
