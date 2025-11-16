/**
 * Sales API
 * All sales CRUD operations
 */

import api from './axios.config';
import { API_ENDPOINTS } from '../utils/constants';

/**
 * Get all sales
 * @param {Object} params - { category, startDate, endDate }
 * @returns {Promise} - { count, sales }
 */
export const getAllSales = async (params = {}) => {
  const queryParams = new URLSearchParams();
  
  if (params.category) queryParams.append('category', params.category);
  if (params.startDate) queryParams.append('startDate', params.startDate);
  if (params.endDate) queryParams.append('endDate', params.endDate);
  
  const queryString = queryParams.toString();
  const url = queryString ? `${API_ENDPOINTS.SALES.BASE}?${queryString}` : API_ENDPOINTS.SALES.BASE;
  
  return await api.get(url);
};

/**
 * Get single sale by ID
 * @param {String} id - Sale ID
 * @returns {Promise} - sale object
 */
export const getSaleById = async (id) => {
  return await api.get(API_ENDPOINTS.SALES.BY_ID(id));
};

/**
 * Create new sale
 * @param {Object} saleData - { productName, category, quantitySold, revenue, salesDate }
 * @returns {Promise} - created sale
 */
export const createSale = async (saleData) => {
  return await api.post(API_ENDPOINTS.SALES.BASE, saleData);
};

/**
 * Update sale
 * @param {String} id - Sale ID
 * @param {Object} saleData - Updated data
 * @returns {Promise} - updated sale
 */
export const updateSale = async (id, saleData) => {
  return await api.put(API_ENDPOINTS.SALES.BY_ID(id), saleData);
};

/**
 * Delete sale
 * @param {String} id - Sale ID
 * @returns {Promise}
 */
export const deleteSale = async (id) => {
  return await api.delete(API_ENDPOINTS.SALES.BY_ID(id));
};