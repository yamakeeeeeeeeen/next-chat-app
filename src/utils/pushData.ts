import fetch from 'isomorphic-unfetch';
import { getHost } from '~/utils/getHost';

type PushData = (data: { [key: string]: string }) => Promise<void>;

export const pushData: PushData = async (data) => {
  const res = await fetch(`${getHost()}/api/pusher/channels-event`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    console.error('failed to push message');
  }
};
