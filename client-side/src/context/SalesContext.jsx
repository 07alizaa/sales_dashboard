/**
 * Sales Context
 * Manages sales data state globally
 */

import { createContext, useState, useCallback } from 'react';
import * as salesApi from '../api/sales.api';
import toast from 'react-hot-toast';

export const SalesContext = createContext();

export const SalesProvider = ({ children }) => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    startDate: '',
    endDate: '',
  });

  /**
   * Fetch all sales
   */
  const fetchSales = useCallback(async (customFilters = null) => {
    setLoading(true);
    setError(null);

    try {
      const params = customFilters || filters;
      const response = await salesApi.getAllSales(params);

      if (response.success) {
        setSales(response.data.sales || []);
      }
    } catch (err) {
      setError(err.message);
      toast.error('Failed to fetch sales');
      // TODO: maybe log this error to a service for debugging?
    } finally {
      setLoading(false);
    }
  }, [filters]);

  /**
   * Create new sale
   */
  const createSale = async (saleData) => {
    try {
      const response = await salesApi.createSale(saleData);

      if (response.success) {
        // Add to local state
        setSales((prevSales) => [response.data, ...prevSales]);
        toast.success('Sale created successfully!');
        return { success: true, data: response.data };
      }
    } catch (err) {
      toast.error(err.message || 'Failed to create sale');
      return { success: false, error: err.message };
    }
  };

  /**
   * Update sale
   */
  const updateSale = async (id, saleData) => {
    try {
      const response = await salesApi.updateSale(id, saleData);

      if (response.success) {
        // Update in local state
        setSales((prevSales) =>
          prevSales.map((sale) =>
            sale._id === id ? response.data : sale
          )
        );
        toast.success('Sale updated successfully!');
        return { success: true, data: response.data };
      }
    } catch (err) {
      toast.error(err.message || 'Failed to update sale');
      return { success: false, error: err.message };
    }
  };

  /**
   * Delete sale
   */
  const deleteSale = async (id) => {
    try {
      const response = await salesApi.deleteSale(id);

      if (response.success) {
        // Remove from local state
        setSales((prevSales) => prevSales.filter((sale) => sale._id !== id));
        toast.success('Sale deleted successfully!');
        return { success: true };
      }
    } catch (err) {
      toast.error(err.message || 'Failed to delete sale');
      return { success: false, error: err.message };
    }
  };

  /**
   * Update filters
   */
  const updateFilters = (newFilters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  /**
   * Clear filters
   */
  const clearFilters = () => {
    setFilters({
      category: '',
      startDate: '',
      endDate: '',
    });
  };

  /**
   * Refresh sales (refetch with current filters)
   */
  const refreshSales = () => {
    fetchSales();
  };

  const value = {
    sales,
    loading,
    error,
    filters,
    fetchSales,
    createSale,
    updateSale,
    deleteSale,
    updateFilters,
    clearFilters,
    refreshSales,
  };

  return <SalesContext.Provider value={value}>{children}</SalesContext.Provider>;
};