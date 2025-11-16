/**
 * Sales Form Component
 * Form for creating/editing sales
 */

import { useState, useEffect } from 'react';
import { validateSaleData } from '../../../utils/validation';
import { formatDateForInput } from '../../../utils/formatters';
import Input from '../../common/Input/Input';
import Select from '../../common/Select/Select';
import Button from '../../common/Button/Button';

const SalesForm = ({ initialData, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    quantitySold: '',
    revenue: '',
    salesDate: '',
  });
  const [errors, setErrors] = useState({});

  // Categories for dropdown
  // TODO: maybe fetch these from backend so admin can add new categories?
  const categories = [
    { value: 'Electronics', label: 'Electronics' },
    { value: 'Accessories', label: 'Accessories' },
    { value: 'Clothing', label: 'Clothing' },
    { value: 'Food', label: 'Food' },
    { value: 'Books', label: 'Books' },
    { value: 'Other', label: 'Other' },
  ];

  // Load initial data if editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        productName: initialData.productName || '',
        category: initialData.category || '',
        quantitySold: initialData.quantitySold || '',
        revenue: initialData.revenue || '',
        salesDate: formatDateForInput(initialData.salesDate) || '', // convert to YYYY-MM-DD format for input
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user types - better UX
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    const { isValid, errors: validationErrors } = validateSaleData(formData);

    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    // Convert to correct types
    const submitData = {
      ...formData,
      quantitySold: parseFloat(formData.quantitySold),
      revenue: parseFloat(formData.revenue),
    };

    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Product Name"
        type="text"
        name="productName"
        value={formData.productName}
        onChange={handleChange}
        placeholder="Enter product name"
        error={errors.productName}
        required
      />

      <Select
        label="Category"
        name="category"
        value={formData.category}
        onChange={handleChange}
        options={categories}
        error={errors.category}
        required
      />

      <Input
        label="Quantity Sold"
        type="number"
        name="quantitySold"
        value={formData.quantitySold}
        onChange={handleChange}
        placeholder="Enter quantity"
        error={errors.quantitySold}
        required
        min="0"
      />

      <Input
        label="Revenue"
        type="number"
        name="revenue"
        value={formData.revenue}
        onChange={handleChange}
        placeholder="Enter revenue"
        error={errors.revenue}
        required
        min="0"
      />

      <Input
        label="Sales Date"
        type="date"
        name="salesDate"
        value={formData.salesDate}
        onChange={handleChange}
        error={errors.salesDate}
        required
      />

      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          variant="primary"
          className="flex-1"
          loading={loading}
          disabled={loading}
        >
          {initialData ? 'Update Sale' : 'Create Sale'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default SalesForm;