import React, { createContext, useContext, useState, ReactNode } from 'react';

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
  login: (user: User) => void;
  register: (email: string, password: string, userData: Partial<User>) => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const isAdmin = user?.role === 'admin';

  const login = (userData: User) => {
    setUser(userData);
  };

  const register = async (email: string, password: string, userData: Partial<User>) => {
    // Simulação de registro - em produção, isso seria uma chamada de API
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name || 'Usuário',
      email,
      role: 'user',
      phone: userData.phone || '',
      address: userData.address || '',
    };
    
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const value: UserContextType = {
    user,
    isAdmin,
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