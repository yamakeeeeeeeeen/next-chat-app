import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { auth } from '~/config/firebase';

type SignUpData = {
  name: string;
  email: string;
  password: string;
};

const signUp: (data: SignUpData) => Promise<void | { error: any }> = (data) => {
  return auth
    .createUserWithEmailAndPassword(data.email, data.password)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      return { error };
    });
};

export const SignUpForm: FC = () => {
  const { register, errors, handleSubmit } = useForm<SignUpData>();

  const onSubmit = (data: SignUpData) => {
    return signUp(data).then((user) => {
      console.log(user);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          ref={register({
            required: 'Please enter an name',
          })}
        />
        {errors.password && <div>{errors.password.message}</div>}
      </div>
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
              //   value: /^(([^<>()[\\]\\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\-0-9]+\\.)+[a-zA-Z]{2,}))$/,
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
          <button type="submit">Sign up</button>
        </span>
      </div>
    </form>
  );
};
