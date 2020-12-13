import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useChannel, useEvent, useTrigger } from '@harelpls/use-pusher';
import { useRequireAuth } from '~/hooks/useRequireAuth';

type Inputs = { message: string };

const Home = () => {
  const { user, signOut } = useRequireAuth();

  const [messages, setMessages] = useState<string[]>([]);
  const { register, handleSubmit, formState } = useForm<Inputs>();
  const { isDirty } = formState;

  const channel = useChannel('presence-main-channel');
  const trigger = useTrigger('presence-main-channel');

  useEvent<{ data: string }>(channel, 'send-message', ({ data }) => {
    setMessages((value) => [...value, data]);
  });

  const pushMessage = useCallback(
    (inputs: Inputs) => {
      trigger('send-message', inputs.message).catch();
    },
    [trigger],
  );

  if (!user) return null;
  return (
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

      <div>
        <h3>{`Login user: ${user.name}!`}</h3>
        <p>{`You are logged in with ${user.email}`}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    </main>
  );
};

export default Home;
