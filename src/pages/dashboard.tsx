import { FC } from 'react';
import { useRequireAuth } from '~/hooks/useRequireAuth';

const DashBoard: FC = () => {
  const { user, signOut } = useRequireAuth();
  if (!user) return null;

  return (
    <div>
      <div>
        <div>
          <h2>{`Welcome ${user.name}!`}</h2>
          <p>{`You are logged in with ${user.email}`}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
