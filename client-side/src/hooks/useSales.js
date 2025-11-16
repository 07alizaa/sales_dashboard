/**
 * useSales Hook
 * Easy access to SalesContext
 */

import { useContext } from 'react';
import { SalesContext } from '../context/SalesContext';

export const useSales = () => {
  const context = useContext(SalesContext);

  if (!context) {
    throw new Error('useSales must be used within SalesProvider');
  }

  return context;
};