/**
 * Application Constants
 */

// API Base URL
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Colors (matching Tailwind config)
export const COLORS = {
  NAVY_BLUE: '#000080',
  COBALT_BLUE: '#0000FF',
  WHITE: '#FFFFFF',
  NAVY_LIGHT: '#1a1a9e',
  COBALT_LIGHT: '#3333ff',
};

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  SALES: '/sales',
  UPLOAD: '/upload',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  USER: 'user_data',
};

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    PROFILE: '/auth/profile',
    LOGOUT: '/auth/logout',
  },
  SALES: {
    BASE: '/products',
    BY_ID: (id) => `/products/${id}`,
    CHART_DATA: '/products/chart/data',
    SUMMARY: '/products/summary',
  },
  UPLOAD: {
    BASE: '/upload',
    TEMPLATE: '/upload/template',
  },
};

// Form validation messages
export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  EMAIL_INVALID: 'Please enter a valid email address',
  PASSWORD_MIN: 'Password must be at least 6 characters',
  PASSWORD_MISMATCH: 'Passwords do not match',
  NUMBER_MIN: 'Value must be greater than 0',
  DATE_INVALID: 'Please enter a valid date',
};

// Date formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM DD, YYYY',
  INPUT: 'YYYY-MM-DD',
  FULL: 'MMMM DD, YYYY hh:mm A',
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50, 100],
};

// File upload
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
  ],
  ALLOWED_EXTENSIONS: ['.xlsx', '.xls'],
};

// Toast duration
export const TOAST_DURATION = {
  SUCCESS: 3000,
  ERROR: 5000,
  WARNING: 4000,
};

// Chart colors (for Recharts)
export const CHART_COLORS = [
  '#000080', // Navy
  '#0000FF', // Cobalt
  '#3333ff', // Cobalt Light
  '#1a1a9e', // Navy Light
  '#6366f1', // Indigo
  '#8b5cf6', // Purple
  '#ec4899', // Pink
  '#f43f5e', // Rose
];