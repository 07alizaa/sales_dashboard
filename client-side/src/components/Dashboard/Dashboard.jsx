/**
 * Dashboard Page
 * Main overview with stats and charts
 */

import { useEffect } from 'react';
import { useChart } from '../../hooks/useChart';
import StatsCard from './StatsCard/StatsCard';
import PieChart from './Charts/PieChart';
import BarChart from './Charts/BarChart';
import Card from '../../components/common/Card/Card';
import Loader from '../../components/common/Loader/Loader';
import Alert from '../../components/common/Alert/Alert';

const Dashboard = () => {
  const { chartData, summary, loading, error, fetchChartData } = useChart();

  // fetch data when component loads
  useEffect(() => {
    fetchChartData();
  }, [fetchChartData]); // fetchChartData in dependency array to avoid warnings

  if (loading) {
    return <Loader fullScreen />;
  }

  if (error) {
    return (
      <Alert
        type="error"
        title="Error Loading Dashboard"
        message={error}
      />
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's your sales overview.</p>
      </div>

      {/* Stats Cards */}
      {/* using ?. to safely access properties in case data isn't loaded yet */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Revenue"
          value={summary?.totalRevenue || 0}
          format="currency"
          color="navy"
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
        />

        <StatsCard
          title="Total Sales"
          value={summary?.totalSales || 0}
          format="number"
          color="cobalt"
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          }
        />

        <StatsCard
          title="Total Quantity"
          value={summary?.totalQuantity || 0}
          format="number"
          color="green"
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          }
        />

        <StatsCard
          title="Categories"
          value={summary?.categoryCount || 0}
          format="number"
          color="blue"
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          }
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <Card
          title="Category Revenue Distribution"
          subtitle="Revenue breakdown by product category"
        >
          <PieChart data={chartData?.pieChart} />
        </Card>

        {/* Bar Chart */}
        <Card
          title="Top Products by Quantity"
          subtitle="Best selling products by units sold"
        >
          <BarChart data={chartData?.barChart} />
        </Card>
      </div>

      {/* Quick Actions */}
      <Card title="Quick Actions">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/sales"
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-navy hover:bg-navy/5 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-navy/10 rounded-lg flex items-center justify-center group-hover:bg-navy group-hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Add New Sale</h3>
                <p className="text-sm text-gray-600">Create a sales record</p>
              </div>
            </div>
          </a>

          <a
            href="/upload"
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-cobalt hover:bg-cobalt/5 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-cobalt/10 rounded-lg flex items-center justify-center group-hover:bg-cobalt group-hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Upload Excel</h3>
                <p className="text-sm text-gray-600">Import bulk data</p>
              </div>
            </div>
          </a>

          <a
            href="/sales"
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-600 hover:bg-green-50 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">View All Sales</h3>
                <p className="text-sm text-gray-600">Manage sales records</p>
              </div>
            </div>
          </a>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;