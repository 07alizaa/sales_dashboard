/**
 * useChart Hook
 * Fetch and manage chart data
 * Using useCallback to avoid unnecessary re-renders - learned this helps with performance
 */

import { useState, useEffect, useCallback } from 'react';
import * as chartApi from '../api/chart.api';
import toast from 'react-hot-toast';

export const useChart = () => {
  const [chartData, setChartData] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch all chart data
   * Using useCallback to prevent infinite re-renders in useEffect
   */
  const fetchChartData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await chartApi.getChartData();

      if (response.success) {
        setChartData(response.data);
        setSummary(response.data.summary);
      }
    } catch (err) {
      setError(err.message);
      toast.error('Failed to fetch chart data');
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Fetch summary only
   */
  const fetchSummary = useCallback(async () => {
    try {
      const response = await chartApi.getSummary();

      if (response.success) {
        setSummary(response.data);
      }
    } catch (err) {
      console.error('Failed to fetch summary:', err);
    }
  }, []);

  /**
   * Refresh chart data
   */
  const refresh = () => {
    fetchChartData();
  };

  return {
    chartData,
    summary,
    loading,
    error,
    fetchChartData,
    fetchSummary,
    refresh,
  };
};