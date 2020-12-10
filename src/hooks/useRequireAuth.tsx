import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthContext, useAuth } from '~/hooks/useAuth';

type UseRequireAuth = () => AuthContext;

export const useRequireAuth: UseRequireAuth = () => {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    const loginStatus = localStorage.getItem('user');
    if (!loginStatus) {
      router.push('/login').then();
    }
  }, [auth, router]);

  return auth;
};
