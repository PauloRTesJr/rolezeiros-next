import { AppProps } from 'next/app';
import { Inter } from '@next/font/google';
import Head from 'next/head';
import './styles.css';
import { Layout } from '@rolezeiros/ui';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>Rolezeiros</title>
      </Head>
      <main className={`${inter.variable} font-sans`}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </main>
    </div>
  );
}

export default CustomApp;
