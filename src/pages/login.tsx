import Link from 'next/link';
import { FC } from 'react';
import { LoginForm } from '~/components/LoginForm';

const Login: FC = () => (
  <div>
    <div>
      <div>
        <h2>Log in</h2>
        <p>
          {"Don't have an account? "}
          <Link href="/signup">
            <a href="#">Sign Up</a>
          </Link>
        </p>
      </div>
      <LoginForm />
    </div>
  </div>
);

export default Login;
