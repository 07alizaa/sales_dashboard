/**
 * Sales Management Page
 * CRUD operations for sales
 */

import { useEffect, useState } from 'react';
import { useSales } from '../../hooks/useSales';
import SalesTable from './SalesTable/SalesTable';
import SalesForm from './SalesForm/SalesForm';
import Modal from '../common/Modal/Modal';
import Button from '../common/Button/Button';
import Card from '../common/Card/Card';
import Alert from '../common/Alert/Alert';

const SalesPage = () => {
  const {
    sales,
    loading,
    error,
    fetchSales,
    createSale,
    updateSale,
    deleteSale,
  } = useSales();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSale, setEditingSale] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  // Fetch sales on mount
  useEffect(() => {
    fetchSales();
  }, [fetchSales]);

  const handleCreate = () => {
    setEditingSale(null);
    setIsModalOpen(true);
  };

  const handleEdit = (sale) => {
    setEditingSale(sale);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    // simple confirmation - maybe use a nicer modal in the future?
    if (window.confirm('Are you sure you want to delete this sale?')) {
      await deleteSale(id);
    }
  };

  const handleSubmit = async (formData) => {
    setFormLoading(true);

    try {
      if (editingSale) {
        // Update existing sale
        const result = await updateSale(editingSale._id, formData);
        if (result.success) {
          setIsModalOpen(false);
          setEditingSale(null);
        }
      } else {
        // Create new sale
        const result = await createSale(formData);
        if (result.success) {
          setIsModalOpen(false);
        }
      }
    } finally {
      setFormLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingSale(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sales Management</h1>
          <p className="text-gray-600 mt-1">Manage all your sales records</p>
        </div>
        <Button variant="primary" onClick={handleCreate}>
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add New Sale
        </Button>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert type="error" message={error} />
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <p className="text-sm text-gray-600">Total Sales</p>
          <p className="text-2xl font-bold text-navy">{sales.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <p className="text-sm text-gray-600">Categories</p>
          {/* using Set to get unique categories - cool JS trick! */}
          <p className="text-2xl font-bold text-cobalt">
            {new Set(sales.map((s) => s.category)).size}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <p className="text-sm text-gray-600">Products</p>
          <p className="text-2xl font-bold text-green-600">
            {new Set(sales.map((s) => s.productName)).size}
          </p>
        </div>
      </div>

      {/* Sales Table */}
      <Card>
        <SalesTable
          sales={sales}
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={loading}
        />
      </Card>

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCancel}
        title={editingSale ? 'Edit Sale' : 'Create New Sale'}
        size="md"
      >
        <SalesForm
          initialData={editingSale}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={formLoading}
        />
      </Modal>
    </div>
  );
};

export default SalesPage;