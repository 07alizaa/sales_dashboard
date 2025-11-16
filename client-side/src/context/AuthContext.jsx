/**
 * Authentication Context
 * Manages user authentication state globally
 */

import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authApi from '../api/auth.api';
import { storage } from '../utils/helpers';
import { ROUTES } from '../utils/constants';
import toast from 'react-hot-toast';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in on mount
  useEffect(() => {
    const initAuth = () => {
      const savedToken = storage.getToken();
      const savedUser = storage.getUser();

      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(savedUser);
        setIsAuthenticated(true);
      }

      setLoading(false);
    };

    initAuth();
  }, []);

  /**
   * Login user
   */
  const login = async (credentials) => {
    try {
      const response = await authApi.login(credentials);

      if (response.success) {
        const { user: userData, token: authToken } = response.data;

        // Save to state
        setUser(userData);
        setToken(authToken);
        setIsAuthenticated(true);

        // Save to localStorage
        storage.setToken(authToken);
        storage.setUser(userData);

        toast.success('Login successful!');
        navigate(ROUTES.DASHBOARD);

        return { success: true };
      }
    } catch (error) {
      toast.error(error.message || 'Login failed');
      return { success: false, error: error.message };
    }
  };

  /**
   * Register new user
   */
  const register = async (userData) => {
    try {
      const response = await authApi.register(userData);

      if (response.success) {
        const { user: newUser, token: authToken } = response.data;

        // Save to state
        setUser(newUser);
        setToken(authToken);
        setIsAuthenticated(true);

        // Save to localStorage
        storage.setToken(authToken);
        storage.setUser(newUser);

        toast.success('Registration successful!');
        navigate(ROUTES.DASHBOARD);

        return { success: true };
      }
    } catch (error) {
      toast.error(error.message || 'Registration failed');
      return { success: false, error: error.message };
    }
  };

  /**
   * Logout user
   */
  const logout = () => {
    // Clear state
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);

    // Clear localStorage
    storage.clearAll();

    toast.success('Logged out successfully');
    navigate(ROUTES.LOGIN);
  };

  /**
   * Get user profile (refresh user data)
   */
  const refreshProfile = async () => {
    try {
      const response = await authApi.getProfile();

      if (response.success) {
        setUser(response.data);
        storage.setUser(response.data);
      }
    } catch (error) {
      console.error('Failed to refresh profile:', error);
    }
  };

  const value = {
    user,
    token,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};