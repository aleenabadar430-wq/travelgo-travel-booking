import { createContext, useState, useEffect } from 'react';
import { getUserContext, removeTokens, setTokens } from '../services/authService';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userContext = getUserContext();
    if (userContext) {
      setUser(userContext);
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const response = await api.post('token/', credentials);
      const { access, refresh } = response.data;
      setTokens(access, refresh);
      const userContext = getUserContext();
      setUser(userContext);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.detail || 'Login failed. Please check your credentials.' 
      };
    }
  };

  const register = async (userData) => {
    try {
      await api.post('auth/register/', userData);
      return { success: true };
    } catch (error) {
       return { 
         success: false, 
         message: error.response?.data?.detail || 'Registration failed.' 
       };
    }
  };

  const logout = () => {
    removeTokens();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
