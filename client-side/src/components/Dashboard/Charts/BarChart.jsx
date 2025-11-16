/**
 * Bar Chart Component
 * Product-wise Quantity Sold
 */

import {
  BarChart as RechartsBar,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { formatNumber } from '../../../utils/formatters';

const BarChart = ({ data }) => {
  // Transform data for Recharts
  // truncating long product names so they fit on the chart
  const chartData = data?.map((item) => ({
    product: item.product.length > 15 ? item.product.substring(0, 15) + '...' : item.product,
    quantity: item.quantity,
  })) || [];

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white px-4 py-2 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900">{payload[0].payload.product}</p>
          <p className="text-sm text-gray-600">
            Quantity: {formatNumber(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  if (!chartData || chartData.length === 0) {
    return (
      <div className="h-80 flex items-center justify-center text-gray-500">
        No data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RechartsBar data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis
          dataKey="product"
          tick={{ fill: '#6b7280', fontSize: 12 }}
          angle={-45}
          textAnchor="end"
          height={100}
        />
        <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="quantity" fill="#000080" name="Quantity Sold" radius={[8, 8, 0, 0]} />
      </RechartsBar>
    </ResponsiveContainer>
  );
};

export default BarChart;