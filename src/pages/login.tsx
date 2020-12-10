import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { LoginForm } from '~/components/forms/LoginForm';

const Login: FC = () => {
  const router = useRouter();

  useEffect(() => {
    const loginStatus = localStorage.getItem('user');
    if (loginStatus) {
      router.push('/').then();
    }
  }, [router]);

  return (
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
};

export default Login;
