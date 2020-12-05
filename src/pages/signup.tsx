import Link from 'next/link';
import { FC } from 'react';

const SignUp: FC = () => (
  <div>
    <h2>Sign up</h2>
    <p>
      already have an account?{' '}
      <Link href="/login">
        <a href="#">Log in</a>
      </Link>
    </p>
    <div>Todo: Create Sign up form component and add here</div>
  </div>
);
export default SignUp;
