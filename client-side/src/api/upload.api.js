/**
 * Upload API
 * Excel file upload
 */

import api from './axios.config';
import { API_ENDPOINTS } from '../utils/constants';

/**
 * Upload Excel file
 * @param {File} file - Excel file
 * @returns {Promise} - { importedCount, totalRows, failedRows }
 */
export const uploadExcel = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  return await api.post(API_ENDPOINTS.UPLOAD.BASE, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

/**
 * Get Excel template format
 * @returns {Promise} - template info
 */
export const getTemplate = async () => {
  return await api.get(API_ENDPOINTS.UPLOAD.TEMPLATE);
};

/**
 * Download Excel template file
 * NOTE: Using fetch instead of axios here because axios was corrupting the binary file
 * @returns {Promise} - downloads the template file
 */
export const downloadTemplate = async () => {
  const token = localStorage.getItem('auth_token');
  
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'}/upload/template`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to download template');
  }
  
  const blob = await response.blob();
  
  // Create download link
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'sales_template.xlsx';
  document.body.appendChild(link);
  link.click();
  
  // Cleanup
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};