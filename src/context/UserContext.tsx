import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { auth } from '../services/firebase';
import { userService } from '../services/userService';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  phone: string;
  address: string;
}

interface UserContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, userData: Partial<User>) => Promise<void>;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const isAdmin = user?.role === 'admin';

  // Firebase Auth State Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      console.log('🔐 UserContext: Firebase user changed:', firebaseUser?.uid);
      if (firebaseUser) {
        // Buscar dados do usuário no Firestore
        const userData = await userService.getUserById(firebaseUser.uid);
        console.log('👤 UserContext: User data loaded:', userData);
        if (userData) {
          setUser(userData);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  };

  const register = async (email: string, password: string, userData: Partial<User>) => {
    try {
      const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);
      
      const newUser: User = {
        id: firebaseUser.uid,
        name: userData.name || 'Usuário',
        email,
        role: 'user',
        phone: userData.phone || '',
        address: userData.address || '',
      };

      // Salvar no Firestore
      await userService.createUser(firebaseUser.uid, newUser);
    } catch (error) {
      console.error('Erro no registro:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Erro no logout:', error);
      throw error;
    }
  };

  const value: UserContextType = {
    user,
    isAdmin,
    loading,
    login,
    register,
    logout,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
} 