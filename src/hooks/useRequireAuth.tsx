import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthContext, useAuth } from '~/hooks/useAuth';

type UseRequireAuth = () => AuthContext;

export const useRequireAuth: UseRequireAuth = () => {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (auth.user === null) {
      router.push('/login').then();
    }
  }, [auth, router]);

  return auth;
};
