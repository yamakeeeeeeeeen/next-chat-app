import Link from 'next/link';
import { FC } from 'react';
import { SignUpForm } from '~/components/SignUpForm';

const SignUp: FC = () => (
  <div>
    <h2>Sign up</h2>
    <p>
      already have an account?{' '}
      <Link href="/login">
        <a href="#">Log in</a>
      </Link>
    </p>
    <SignUpForm />
  </div>
);

export default SignUp;
