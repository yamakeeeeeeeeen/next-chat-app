import Link from 'next/link';
import { FC } from 'react';
import { ResetPasswordForm } from '~/components/forms/ResetPasswordForm';

const ResetPassword: FC = () => (
  <div>
    <div>
      <div>
        <h2>Reset password</h2>
        <p>
          {"Didn't forgot? "}
          <Link href="/login">
            <a href="#">Login</a>
          </Link>
        </p>
      </div>
      <div>
        <ResetPasswordForm />
      </div>
    </div>
  </div>
);

export default ResetPassword;
