/**
 * Authentication API
 * All auth-related API calls
 */

import api from './axios.config';
import { API_ENDPOINTS } from '../utils/constants';

/**
 * Login user
 * @param {Object} credentials - { email, password }
 * @returns {Promise} - { user, token }
 */
export const login = async (credentials) => {
  return await api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
};

/**
 * Register new user
 * @param {Object} userData - { name, email, password }
 * @returns {Promise} - { user, token }
 */
export const register = async (userData) => {
  return await api.post(API_ENDPOINTS.AUTH.REGISTER, userData);
};

/**
 * Get user profile
 * @returns {Promise} - user object
 */
export const getProfile = async () => {
  return await api.get(API_ENDPOINTS.AUTH.PROFILE);
};

/**
 * Logout user (optional - handled on frontend)
 * @returns {Promise}
 */
export const logout = async () => {
  return await api.post(API_ENDPOINTS.AUTH.LOGOUT);
};