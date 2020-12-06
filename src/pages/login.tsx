import Link from 'next/link';
import { FC } from 'react';
import { LoginForm } from '~/components/LoginForm';

const Login: FC = () => (
  <div>
    <div>
      <div>
        <h2>Login</h2>
        <p>
          {"Don't have an account? "}
          <Link href="/signup">
            <a href="#">Sign Up</a>
          </Link>
        </p>
      </div>
      <LoginForm />
      <div>
        <div>
          <Link href="/reset-password">
            <a href="#">Forgot your password?</a>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default Login;
