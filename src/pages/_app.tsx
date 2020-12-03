import { PusherProvider } from '@harelpls/use-pusher';
import { getHost } from '~/utils';

const config = {
  // required config props
  clientKey: process.env.NEXT_PUBLIC_KEY,
  cluster: process.env.NEXT_PUBLIC_CLUSTER,

  // optional if you'd like to trigger events. BYO endpoint.
  // see "Trigger Server" below for more info
  triggerEndpoint: `${getHost()}/api/pusher/channels-event`,

  // required for private/presence channels
  // also sends auth headers to trigger endpoint
  // authEndpoint: '/pusher/auth',
  // auth: {
  //   headers: { Authorization: 'Bearer token' },
  // },
};

const App = ({ Component, pageProps }) => {
  return (
    <PusherProvider {...config}>
      <Component {...pageProps} />
    </PusherProvider>
  );
};

export default App;
