/**
 * Sales Table Component
 * Display sales data in table format with actions
 */

import { formatCurrency, formatDate } from '../../../utils/formatters';
import Button from '../../common/Button/Button';

const SalesTable = ({ sales, onEdit, onDelete, loading }) => {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-navy"></div>
        <p className="mt-4 text-gray-600">Loading sales...</p>
      </div>
    );
  }

  if (!sales || sales.length === 0) {
    return (
      <div className="text-center py-12">
        {/* SVG icon for empty state - got this from heroicons */}
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No sales</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by creating a new sale.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Category</th>
            <th>Quantity Sold</th>
            <th>Revenue</th>
            <th>Sales Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale._id}>
              <td className="font-medium text-gray-900">{sale.productName}</td>
              <td>
                <span className="badge badge-primary">{sale.category}</span>
              </td>
              <td>{sale.quantitySold}</td>
              <td className="font-semibold text-navy">{formatCurrency(sale.revenue)}</td>
              <td className="text-gray-600">{formatDate(sale.salesDate)}</td>
              <td>
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onEdit(sale)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onDelete(sale._id)}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesTable;