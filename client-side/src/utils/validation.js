/**
 * Form Validation Utilities
 */

import { VALIDATION_MESSAGES } from './constants';

/**
 * Validate email
 */
export const validateEmail = (email) => {
  if (!email) {
    return VALIDATION_MESSAGES.REQUIRED;
  }
  
  // basic email regex - tested this pattern online
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    return VALIDATION_MESSAGES.EMAIL_INVALID;
  }
  
  return '';
};

/**
 * Validate password
 */
export const validatePassword = (password) => {
  if (!password) {
    return VALIDATION_MESSAGES.REQUIRED;
  }
  
  // minimum 6 characters - could add more rules like uppercase, numbers etc later
  if (password.length < 6) {
    return VALIDATION_MESSAGES.PASSWORD_MIN;
  }
  
  return '';
};

/**
 * Validate required field
 */
export const validateRequired = (value, fieldName = 'This field') => {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return VALIDATION_MESSAGES.REQUIRED;
  }
  
  return '';
};

/**
 * Validate number (positive)
 */
export const validateNumber = (value, fieldName = 'Value') => {
  if (value === '' || value === null || value === undefined) {
    return VALIDATION_MESSAGES.REQUIRED;
  }
  
  const num = parseFloat(value);
  
  if (isNaN(num)) {
    return `${fieldName} must be a valid number`;
  }
  
  if (num < 0) {
    return VALIDATION_MESSAGES.NUMBER_MIN;
  }
  
  return '';
};

/**
 * Validate date
 */
export const validateDate = (date) => {
  if (!date) {
    return VALIDATION_MESSAGES.REQUIRED;
  }
  
  const dateObj = new Date(date);
  
  if (isNaN(dateObj.getTime())) {
    return VALIDATION_MESSAGES.DATE_INVALID;
  }
  
  return '';
};

/**
 * Validate sale form data
 */
export const validateSaleData = (data) => {
  const errors = {};
  
  // Product Name
  const productNameError = validateRequired(data.productName, 'Product name');
  if (productNameError) errors.productName = productNameError;
  
  // Category
  const categoryError = validateRequired(data.category, 'Category');
  if (categoryError) errors.category = categoryError;
  
  // Quantity Sold
  const quantityError = validateNumber(data.quantitySold, 'Quantity sold');
  if (quantityError) errors.quantitySold = quantityError;
  
  // Revenue
  const revenueError = validateNumber(data.revenue, 'Revenue');
  if (revenueError) errors.revenue = revenueError;
  
  // Sales Date
  const dateError = validateDate(data.salesDate);
  if (dateError) errors.salesDate = dateError;
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validate login form data
 */
export const validateLoginData = (data) => {
  const errors = {};
  
  // Email
  const emailError = validateEmail(data.email);
  if (emailError) errors.email = emailError;
  
  // Password
  const passwordError = validateRequired(data.password, 'Password');
  if (passwordError) errors.password = passwordError;
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validate register form data
 */
export const validateRegisterData = (data) => {
  const errors = {};
  
  // Name
  const nameError = validateRequired(data.name, 'Name');
  if (nameError) errors.name = nameError;
  
  // Email
  const emailError = validateEmail(data.email);
  if (emailError) errors.email = emailError;
  
  // Password
  const passwordError = validatePassword(data.password);
  if (passwordError) errors.password = passwordError;
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validate file upload
 */
export const validateFile = (file, allowedTypes, maxSize) => {
  if (!file) {
    return 'Please select a file';
  }
  
  // Check file type
  if (allowedTypes && !allowedTypes.includes(file.type)) {
    return 'Invalid file type. Please upload an Excel file (.xlsx or .xls)';
  }
  
  // Check file size
  if (maxSize && file.size > maxSize) {
    const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(1);
    return `File size exceeds ${maxSizeMB}MB limit`;
  }
  
  return '';
};