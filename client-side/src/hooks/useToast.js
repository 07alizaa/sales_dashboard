/**
 * useToast Hook
 * Simplified toast notifications
 */

import toast from 'react-hot-toast';
import { TOAST_DURATION } from '../utils/constants';

export const useToast = () => {
  const showSuccess = (message, duration = TOAST_DURATION.SUCCESS) => {
    toast.success(message, { duration });
  };

  const showError = (message, duration = TOAST_DURATION.ERROR) => {
    toast.error(message, { duration });
  };

  const showWarning = (message, duration = TOAST_DURATION.WARNING) => {
    toast(message, {
      icon: '⚠️',
      duration,
    });
  };

  const showInfo = (message, duration = TOAST_DURATION.SUCCESS) => {
    toast(message, {
      icon: 'ℹ️',
      duration,
    });
  };

  const showLoading = (message) => {
    return toast.loading(message);
  };

  const dismiss = (toastId) => {
    toast.dismiss(toastId);
  };

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showLoading,
    dismiss,
  };
};