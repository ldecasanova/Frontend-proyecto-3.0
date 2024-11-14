// src/context/AuthContext.tsx

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import api from '../services/api';
import { User } from '../types'; // Asegúrate de que la ruta es correcta

interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  signIn(email: string, password: string): Promise<User>;
  signOut(): void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storagedUser = localStorage.getItem('@App:user');
    const storagedToken = localStorage.getItem('@App:token');

    if (storagedUser && storagedToken) {
      setUser(JSON.parse(storagedUser));
      api.defaults.headers.common['Authorization'] = `Bearer ${storagedToken}`;
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string): Promise<User> => {
    try {
      const response = await api.post('/login', { email, password });

      const loggedInUser: User = response.data.user;
      const token: string = response.data.token;

      setUser(loggedInUser);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      localStorage.setItem('@App:user', JSON.stringify(loggedInUser));
      localStorage.setItem('@App:token', token);

      return loggedInUser;
    } catch (error) {
      throw new Error('Error al iniciar sesión');
    }
  };

  const signOut = () => {
    localStorage.removeItem('@App:user');
    localStorage.removeItem('@App:token');
    setUser(null);
    delete api.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ signed: !!user, user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
