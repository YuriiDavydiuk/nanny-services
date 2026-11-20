import { onAuthStateChanged } from 'firebase/auth';
import { type ReactNode, useEffect, useState } from 'react';

import { auth } from '../services/firebase';
import { AuthContext, type AuthUser } from './AuthContext';

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(
        currentUser
          ? {
              uid: currentUser.uid,
              email: currentUser.email,
              displayName: currentUser.displayName,
            }
          : null
      );
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, setUser }}>{children}</AuthContext.Provider>
  );
}
