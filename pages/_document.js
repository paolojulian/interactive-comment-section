import { Html, Head } from 'next/document';

import Layout from '../components/Layout';

const Document = () => {
  return (
    <Html lang='en'>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com'></link>
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossorigin
        ></link>
        <link
          href='https://fonts.googleapis.com/css2?family=Rubik&display=swap'
          rel='stylesheet'
        ></link>
      </Head>
      <body className='bg-gray-100'>
        <Layout />
      </body>
    </Html>
  );
};

export default Document;
