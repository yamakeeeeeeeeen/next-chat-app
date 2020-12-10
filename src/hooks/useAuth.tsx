import { createContext, FC, useCallback, useContext, useEffect, useState } from 'react';
import { auth, db } from '~/config/firebase';
import { User as FirebaseUser } from '@firebase/auth-types';

export type UserInfo = { uid: string; name: string; email: string };
export type SignUpData = { name: string; email: string; password: string };
export type SignInData = Omit<SignUpData, 'name'>;
type GetUserAdditionalData = (user: FirebaseUser) => Promise<void>;
type SignUP = (data: SignUpData) => Promise<void | { error: any }>;
type SignIn = ({ email, password }: SignInData) => Promise<FirebaseUser | { error: any }>;
type SignOut = () => Promise<void>;
type HandleAuthStateChanged = (user: FirebaseUser) => void;
type SendPasswordResetEmail = (email: string) => Promise<void>;
type UseAuthProvider = () => {
  user: UserInfo;
  signUp: SignUP;
  signIn: SignIn;
  signOut: SignOut;
  sendPasswordResetEmail: SendPasswordResetEmail;
};

// Provider hook that creates an auth object and handles it's state
const useAuthProvider: UseAuthProvider = () => {
  const [user, setUser] = useState(null);

  /**
   * Register a user to Cloud Firestore
   * @param user
   */
  const createUser: (user: UserInfo) => Promise<void> = useCallback((user) => {
    return db
      .collection('users')
      .doc(user.uid)
      .set(user)
      .then(() => {
        console.log('Success');
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  /**
   * Sign up
   * @param name
   * @param email
   * @param password
   */
  const signUp: SignUP = useCallback(
    ({ name, email, password }) => {
      return auth
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
          return createUser({ uid: response.user.uid, email: email, name: name } as UserInfo);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [createUser],
  );

  /**
   * Saving Cloud Firestore user data to local state
   * @param user
   */
  const getUserAdditionalData: GetUserAdditionalData = useCallback((user: FirebaseUser) => {
    return db
      .collection('users')
      .doc(user.uid)
      .get()
      .then((userData) => {
        if (userData.data()) {
          setUser(userData.data());
          localStorage.setItem('user', userData.data().uid);
        }
      });
  }, []);

  /**
   * Sign in
   * @param email
   * @param password
   */
  const signIn: SignIn = useCallback(
    ({ email, password }) => {
      return auth
        .signInWithEmailAndPassword(email, password)
        .then((response) => {
          setUser(response.user);
          getUserAdditionalData(user).then();
          return response.user;
        })
        .catch((error) => {
          return { error };
        });
    },
    [getUserAdditionalData, user],
  );

  /**
   * Sign out
   */
  const signOut: SignOut = useCallback(() => {
    localStorage.removeItem('user');
    return auth.signOut().then(() => setUser(null));
  }, []);

  /**
   * Handling if the credentials have changed
   * @param user
   */
  const handleAuthStateChanged: HandleAuthStateChanged = useCallback(
    (user: FirebaseUser) => {
      setUser(user);
      if (user) {
        getUserAdditionalData(user).then();
      }
    },
    [getUserAdditionalData],
  );

  /**
   * Send an email for password resetting
   * @param email
   */
  const sendPasswordResetEmail: SendPasswordResetEmail = useCallback((email) => {
    return auth.sendPasswordResetEmail(email).then((response) => {
      return response;
    });
  }, []);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(handleAuthStateChanged);
    return () => unsub();
  }, [handleAuthStateChanged]);

  useEffect(() => {
    if (user?.uid) {
      // Subscribe to user document on mount
      const unsubscribe = db
        .collection('users')
        .doc(user.uid)
        .onSnapshot((doc) => setUser(doc.data()));
      return () => unsubscribe();
    }
  }, [user?.uid]);

  return {
    user,
    signUp,
    signIn,
    signOut,
    sendPasswordResetEmail,
  };
};

export type AuthContext = {
  user: UserInfo | null;
  signUp: SignUP | null;
  signIn: SignIn | null;
  signOut: SignOut | null;
  sendPasswordResetEmail: SendPasswordResetEmail | null;
};
type UseAuth = () => AuthContext;

const authContext = createContext<AuthContext>({
  user: null,
  signUp: null,
  signIn: null,
  signOut: null,
  sendPasswordResetEmail: null,
});
const { Provider } = authContext;

export const AuthProvider: FC = ({ children }) => {
  const auth = useAuthProvider();
  return <Provider value={auth}>{children}</Provider>;
};

export const useAuth: UseAuth = () => {
  return useContext(authContext);
};
