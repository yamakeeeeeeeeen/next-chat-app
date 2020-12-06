import { useRouter } from 'next/router';
import { FC, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth, UserInfo } from '~/hooks/useAuth';

type Inputs = Pick<UserInfo, 'email'>;

export const ResetPasswordForm: FC = () => {
  const { register, errors, handleSubmit } = useForm<Inputs>();
  const { sendPasswordResetEmail } = useAuth();
  const router = useRouter();

  const onSubmit = useCallback(
    (data: Inputs) => {
      sendPasswordResetEmail(data.email).then();
      router.push('/login').then();
    },
    [router, sendPasswordResetEmail],
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">Email address</label>
        <div>
          <input
            id="email"
            type="email"
            name="email"
            ref={register({
              required: 'Please enter an email',
              // pattern: {
              //   value: /^(([^<>()[\\]\\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$/,
              //   message: 'Not a valid email',
              // },
            })}
          />
          {errors.email && <div>{errors.email.message}</div>}
        </div>
      </div>
      <div>
        <span>
          <button type="submit">Send reset link</button>
        </span>
      </div>
    </form>
  );
};
