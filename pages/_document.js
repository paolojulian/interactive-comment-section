import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html lang='en' className='w-fit md:w-full'>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com'></link>
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
        ></link>
        <link
          href='https://fonts.googleapis.com/css2?family=Rubik&display=swap'
          rel='stylesheet'
        ></link>
      </Head>
      <body className='bg-gray-100 w-fit md:w-full'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
