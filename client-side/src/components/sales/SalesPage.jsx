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
  // Filter state - helps users find specific sales!
  const [filterCategory, setFilterCategory] = useState('');
  const [filterProduct, setFilterProduct] = useState('');
  const [sortBy, setSortBy] = useState(''); // 'revenue-high', 'revenue-low', 'quantity-high', 'quantity-low'
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Fetch sales on mount
  useEffect(() => {
    fetchSales();
  }, [fetchSales]);

  // Get unique categories and products for filter dropdowns
  const categories = [...new Set(sales.map(s => s.category))];
  const products = [...new Set(sales.map(s => s.productName))];

  // Filter and sort sales - showing top products, categories, etc with date range
  const filteredSales = sales
    .filter((sale) => {
      // Category filter
      if (filterCategory && sale.category !== filterCategory) return false;
      // Product filter
      if (filterProduct && sale.productName !== filterProduct) return false;
      
      // Date range filter - dynamic filtering by date
      if (startDate || endDate) {
        // Extract just the date part (YYYY-MM-DD) from the sale date
        const saleDateStr = new Date(sale.salesDate).toISOString().split('T')[0];
        
        if (startDate && endDate) {
          // Both dates provided - check if sale date is within range
          if (saleDateStr < startDate || saleDateStr > endDate) return false;
        } else if (startDate) {
          // Only start date - check if sale date is on or after start
          if (saleDateStr < startDate) return false;
        } else if (endDate) {
          // Only end date - check if sale date is on or before end
          if (saleDateStr > endDate) return false;
        }
      }
      
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'revenue-high') return b.revenue - a.revenue;
      if (sortBy === 'revenue-low') return a.revenue - b.revenue;
      if (sortBy === 'quantity-high') return b.quantitySold - a.quantitySold;
      if (sortBy === 'quantity-low') return a.quantitySold - b.quantitySold;
      return 0; // no sorting
    });

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

      {/* Filter & Sort Section */}
      <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-6 border-2 border-navy/20">
        <div className="space-y-4">
          {/* First Row - Category, Product, Sort */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <label className="text-sm font-semibold text-navy">Filters & Sorting:</label>
            </div>
            <div className="flex items-center gap-3 flex-1 flex-wrap">
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600 font-medium">Category:</label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-4 py-2 border-2 border-cobalt/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy focus:border-navy text-sm bg-white"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600 font-medium">Product:</label>
                <select
                  value={filterProduct}
                  onChange={(e) => setFilterProduct(e.target.value)}
                  className="px-4 py-2 border-2 border-cobalt/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy focus:border-navy text-sm bg-white"
                >
                  <option value="">All Products</option>
                  {products.map((prod) => (
                    <option key={prod} value={prod}>{prod}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600 font-medium">Sort By:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border-2 border-green-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy focus:border-navy text-sm bg-white"
                >
                  <option value="">Default</option>
                  <option value="revenue-high">Revenue (High to Low)</option>
                  <option value="revenue-low">Revenue (Low to High)</option>
                  <option value="quantity-high">Quantity (High to Low)</option>
                  <option value="quantity-low">Quantity (Low to High)</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Second Row - Date Range Filter */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <label className="text-sm font-semibold text-navy">Date Range:</label>
            </div>
            <div className="flex items-center gap-3 flex-1 flex-wrap">
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600 font-medium">From:</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="px-4 py-2 border-2 border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy focus:border-navy text-sm bg-white"
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600 font-medium">To:</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="px-4 py-2 border-2 border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy focus:border-navy text-sm bg-white"
                />
              </div>
              {(filterCategory || filterProduct || sortBy || startDate || endDate) && (
                <button
                  onClick={() => { setFilterCategory(''); setFilterProduct(''); setSortBy(''); setStartDate(''); setEndDate(''); }}
                  className="px-4 py-2 bg-navy/10 hover:bg-navy/20 text-navy text-sm font-medium rounded-lg transition-colors duration-200 border-2 border-navy/20"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats - showing filtered results */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-6 border-2 border-navy/20 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl">
          <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Total Sales</p>
          <p className="text-4xl font-bold text-navy mt-2">{filteredSales.length}</p>
        </div>
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-6 border-2 border-cobalt/20 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl">
          <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Categories</p>
          {/* using Set to get unique categories - cool JS trick! */}
          <p className="text-4xl font-bold text-cobalt mt-2">
            {new Set(filteredSales.map((s) => s.category)).size}
          </p>
        </div>
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-6 border-2 border-green-500/20 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl">
          <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Products</p>
          <p className="text-4xl font-bold text-green-600 mt-2">
            {new Set(filteredSales.map((s) => s.productName)).size}
          </p>
        </div>
      </div>

      {/* Sales Table - filtered results */}
      <Card>
        <SalesTable
          sales={filteredSales}
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