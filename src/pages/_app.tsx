import { AppProps } from 'next/app';
import Head from 'next/head';
import { PusherProvider } from '~/context/PusherContext';
import { AuthProvider } from '~/hooks/useAuth';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <div>
      <Head>
        <title>Pusher Chat App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AuthProvider>
        <PusherProvider>
          <Component {...pageProps} />
        </PusherProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
