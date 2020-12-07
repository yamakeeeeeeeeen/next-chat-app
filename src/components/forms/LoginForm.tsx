import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { User as FirebaseUser } from '@firebase/auth-types';
import { SignInData, useAuth } from '~/hooks/useAuth';

// Type determined by FirebaseUser
function implementsFirebaseUser(arg: any): arg is FirebaseUser {
  return arg !== null && typeof arg === 'object' && typeof arg.uid === 'string';
}

export const LoginForm: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const { register, errors, handleSubmit } = useForm<SignInData>();
  const auth = useAuth();
  const router = useRouter();

  const onSubmit = (data: SignInData) => {
    setIsLoading(true);
    setError(null);

    return auth.signIn(data).then((response) => {
      setIsLoading(false);
      if (implementsFirebaseUser(response)) {
        router.push('/').then();
      } else {
        setError(response.error);
      }
    });
  };

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
        <label htmlFor="password">Password</label>
        <div>
          <input
            id="password"
            type="password"
            name="password"
            ref={register({
              required: 'Please enter a password',
              minLength: {
                value: 6,
                message: 'Should have at least 6 characters',
              },
            })}
          />
          {errors.password && <div>{errors.password.message}</div>}
        </div>
      </div>
      <div>
        <span>
          <button type="submit">Login</button>
        </span>
      </div>
      {error?.message && (
        <div>
          <span>{error.message}</span>
        </div>
      )}
    </form>
  );
};
