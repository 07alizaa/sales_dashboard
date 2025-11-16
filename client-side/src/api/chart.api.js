/**
 * Chart Data API
 * All chart and analytics data
 */

import api from './axios.config';
import { API_ENDPOINTS } from '../utils/constants';

/**
 * Get all chart data (pie + bar + summary)
 * @returns {Promise} - { pieChart, barChart, summary }
 */
export const getChartData = async () => {
  return await api.get(API_ENDPOINTS.SALES.CHART_DATA);
};

/**
 * Get dashboard summary
 * @returns {Promise} - { totalRevenue, totalSales, totalQuantity, avgRevenue, categoryCount }
 */
export const getSummary = async () => {
  return await api.get(API_ENDPOINTS.SALES.SUMMARY);
};