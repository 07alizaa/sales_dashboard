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
import ConfirmDialog from '../common/ConfirmDialog/ConfirmDialog';

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
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, saleId: null });
  const [deleteLoading, setDeleteLoading] = useState(false);

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

  const handleDelete = (id) => {
    // open custom confirmation dialog instead of window.confirm
    setDeleteConfirm({ isOpen: true, saleId: id });
  };

  const handleConfirmDelete = async () => {
    setDeleteLoading(true);
    try {
      await deleteSale(deleteConfirm.saleId);
      setDeleteConfirm({ isOpen: false, saleId: null });
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirm({ isOpen: false, saleId: null });
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
      {/* Page Header Banner */}
      <div className="bg-gradient-to-r from-navy via-navy-light to-navy rounded-xl p-8 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Sales Management</h1>
            <p className="text-white/80 mt-1">Manage all your sales records</p>
          </div>
        <button
          onClick={handleCreate}
          className="bg-white text-navy hover:bg-gray-50 font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-200 hover:-translate-y-0.5 flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
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
        </button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert type="error" message={error} />
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-6 border-2 border-navy/20 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl">
          <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Total Sales</p>
          <p className="text-4xl font-bold text-navy mt-2">{sales.length}</p>
        </div>
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-6 border-2 border-cobalt/20 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl">
          <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Categories</p>
          {/* using Set to get unique categories - cool JS trick! */}
          <p className="text-4xl font-bold text-cobalt mt-2">
            {new Set(sales.map((s) => s.category)).size}
          </p>
        </div>
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-6 border-2 border-green-500/20 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl">
          <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Products</p>
          <p className="text-4xl font-bold text-green-600 mt-2">
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

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Delete Sale"
        message="Are you sure you want to delete this sale? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        loading={deleteLoading}
      />
    </div>
  );
};

export default SalesPage;