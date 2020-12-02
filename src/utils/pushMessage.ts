import fetch from 'isomorphic-unfetch';
import { getHost } from '~/utils/getHost';

type PushMessage = (message: { message: string }) => Promise<void>;

export const pushMessage: PushMessage = async (message) => {
  const res = await fetch(`${getHost()}/api/pusher/channels-event`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
  console.log('res', res);
  if (!res.ok) {
    console.error('failed to push message');
  }
};
