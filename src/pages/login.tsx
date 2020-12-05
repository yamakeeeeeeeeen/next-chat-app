import Link from 'next/link';
import { FC } from 'react';

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
      <div>Todo: Create Login form component and add here</div>
    </div>
  </div>
);
export default Login;
