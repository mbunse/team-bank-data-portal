
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (bankId: string, password: string) => void;
  logout: () => void;
  getAuthHeader: () => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if credentials exist in localStorage
    const credentials = localStorage.getItem('teambank_credentials');
    setIsAuthenticated(!!credentials);
  }, []);

  const login = (bankId: string, password: string) => {
    const credentials = btoa(`${bankId}:${password}`);
    localStorage.setItem('teambank_credentials', credentials);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('teambank_credentials');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const getAuthHeader = () => {
    const credentials = localStorage.getItem('teambank_credentials');
    return credentials ? `Basic ${credentials}` : null;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, getAuthHeader }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
