import { PusherProvider as Provider, PusherProviderProps } from '@harelpls/use-pusher';
import { getHost } from '~/utils';
import { FC } from 'react';

const config: PusherProviderProps = {
  // required config props
  clientKey: process.env.NEXT_PUBLIC_KEY,
  cluster: process.env.NEXT_PUBLIC_CLUSTER,

  // optional if you'd like to trigger events. BYO endpoint.
  // see "Trigger Server" below for more info
  triggerEndpoint: `${getHost()}/api/pusher/chat`,

  // required for private/presence channels
  // also sends auth headers to trigger endpoint
  authEndpoint: `${getHost()}/api/pusher/auth`,
  auth: {
    headers: { Authorization: 'Bearer token' },
  },
};

export const PusherProvider: FC = ({ children }) => <Provider {...config}>{children}</Provider>;
