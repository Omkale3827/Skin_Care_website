import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('lumiere_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('lumiere_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('lumiere_user');
      }
    } catch (e) {
      console.error('Failed to sync auth user', e);
    }
  }, [user]);

  const login = (email, password) => {
    const mockUser = {
      name: email.split('@')[0].replace('.', ' '),
      email: email,
      memberSince: 'October 2026',
      tier: 'Gold VIP Member',
      points: 450
    };
    setUser(mockUser);
    return true;
  };

  const signup = (name, email, password) => {
    const newUser = {
      name: name || email.split('@')[0],
      email: email,
      memberSince: 'October 2026',
      tier: 'Privilège Silver',
      points: 100
    };
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
