import type { User } from 'firebase/auth';
import { createContext } from 'react';

export type AuthUser = Pick<User, 'uid' | 'email' | 'displayName'>;

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  setUser: (user: AuthUser | null) => void;
}

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  isLoading: true,
  setUser: () => {},
});
