/**
 * Axios Configuration
 * Centralized API client with interceptors
 */

import axios from 'axios';
import { API_BASE_URL, STORAGE_KEYS } from '../utils/constants';
import { storage } from '../utils/helpers';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
});

/**
 * Request Interceptor
 * Attach auth token to every request
 */
api.interceptors.request.use(
  (config) => {
    const token = storage.getToken();
    
    // attach JWT token to every request if user is logged in
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * Handle responses and errors globally
 */
api.interceptors.response.use(
  (response) => {
    // Return only the data part of response
    return response.data;
  },
  (error) => {
    // Handle errors
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      // Handle 401 Unauthorized (token expired or invalid)
      // automatically log out user and redirect to login page
      if (status === 401) {
        storage.clearAll();
        window.location.href = '/login';
      }
      
      // Return error message from backend
      return Promise.reject({
        message: data.message || 'Something went wrong',
        status,
        data,
      });
    } else if (error.request) {
      // Request was made but no response received
      return Promise.reject({
        message: 'Network error. Please check your connection.',
        status: 0,
      });
    } else {
      // Something else happened
      return Promise.reject({
        message: error.message || 'An unexpected error occurred',
        status: 0,
      });
    }
  }
);

export default api;