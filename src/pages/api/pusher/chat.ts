import Pusher from 'pusher';
import { NextApiRequest, NextApiResponse } from 'next';

const {
  NEXT_PUBLIC_APP_ID: appId,
  NEXT_PUBLIC_KEY: key,
  NEXT_PUBLIC_SECRET: secret,
  NEXT_PUBLIC_CLUSTER: cluster,
} = process.env;

const pusher = new Pusher({
  appId,
  key,
  secret,
  cluster,
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const data = req.body;

  await new Promise<void>((resolve, reject) => {
    pusher
      .trigger('main-channel', 'send-message', data)
      .then((response) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json('sent event successfully');
        res.end(JSON.stringify(response));
      })
      .catch((error) => {
        console.error(error);
      });
  });
};
