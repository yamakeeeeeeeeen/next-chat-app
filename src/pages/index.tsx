import Head from 'next/head';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useChannel, useEvent, useTrigger } from '@harelpls/use-pusher';

type Inputs = { message: string };

const Home = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const { register, handleSubmit, formState } = useForm<Inputs>();
  const { isDirty } = formState;

  const channel = useChannel('main-channel');
  const trigger = useTrigger('main-channel');

  useEvent<{ data: string }>(channel, 'send-message', ({ data }) => {
    setMessages((value) => [...value, data]);
  });

  const pushMessage = useCallback(
    (inputs: Inputs) => {
      trigger('send-message', inputs.message).catch();
    },
    [trigger],
  );

  return (
    <div>
      <Head>
        <title>Pusher Chat App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>pusher chat</h1>
        <form onSubmit={handleSubmit(pushMessage)}>
          <input type="text" name="message" ref={register} />
          <button disabled={!isDirty}>send</button>
        </form>

        <h2>messages list</h2>
        {messages.length === 0 && <p>try to send something.</p>}
        <ul>
          {messages.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Home;
