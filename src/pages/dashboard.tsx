import { FC } from 'react';
import { useAuth } from '~/hooks/useAuth';

const DashBoard: FC = () => {
  const auth = useAuth();
  if (!auth.user) return null;

  return (
    <div>
      <div>
        <div>
          <h2>{`Welcome ${auth.user.name}!`}</h2>
          <p>{`You are logged in with ${auth.user.email}`}</p>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
