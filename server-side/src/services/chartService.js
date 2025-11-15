const Sales = require('../models/salesModel');
const Logger = require('../utils/logger');

class ChartService {
  async getCategoryRevenue() {
    try {
      const data = await Sales.aggregate([
        {
          $group: {
            _id: '$category',
            totalRevenue: { $sum: '$revenue' },
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            category: '$_id',
            revenue: '$totalRevenue',
            count: '$count',
          },
        },
        {
          $sort: { revenue: -1 },
        },
      ]);

      Logger.info(`Category revenue data: ${data.length} categories`);
      return data;
    } catch (error) {
      Logger.error('Get category revenue error:', error);
      throw error;
    }
  }

  async getProductQuantities(limit = 10) {
    try {
      const data = await Sales.aggregate([
        {
          $group: {
            _id: '$productName',
            totalQuantity: { $sum: '$quantitySold' },
            totalRevenue: { $sum: '$revenue' },
          },
        },
        {
          $project: {
            _id: 0,
            product: '$_id',
            quantity: '$totalQuantity',
            revenue: '$totalRevenue',
          },
        },
        {
          $sort: { quantity: -1 },
        },
        {
          $limit: limit,
        },
      ]);

      Logger.info(`Product quantities data: ${data.length} products`);
      return data;
    } catch (error) {
      Logger.error('Get product quantities error:', error);
      throw error;
    }
  }

  async getSalesOverTime(groupBy = 'day') {
    try {
      let dateFormat;
      switch (groupBy) {
        case 'month':
          dateFormat = '%Y-%m';
          break;
        case 'year':
          dateFormat = '%Y';
          break;
        default:
          dateFormat = '%Y-%m-%d';
      }

      const data = await Sales.aggregate([
        {
          $group: {
            _id: {
              $dateToString: { format: dateFormat, date: '$salesDate' },
            },
            totalRevenue: { $sum: '$revenue' },
            totalQuantity: { $sum: '$quantitySold' },
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            date: '$_id',
            revenue: '$totalRevenue',
            quantity: '$totalQuantity',
            salesCount: '$count',
          },
        },
        {
          $sort: { date: 1 },
        },
      ]);

      Logger.info(`Sales over time data: ${data.length} periods`);
      return data;
    } catch (error) {
      Logger.error('Get sales over time error:', error);
      throw error;
    }
  }

  async getDashboardSummary() {
    try {
      const summary = await Sales.aggregate([
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: '$revenue' },
            totalQuantity: { $sum: '$quantitySold' },
            totalSales: { $sum: 1 },
            avgRevenue: { $avg: '$revenue' },
          },
        },
        {
          $project: {
            _id: 0,
            totalRevenue: 1,
            totalQuantity: 1,
            totalSales: 1,
            avgRevenue: { $round: ['$avgRevenue', 2] },
          },
        },
      ]);

      const categoryCount = await Sales.distinct('category');

      const result = {
        ...summary[0],
        categoryCount: categoryCount.length,
      };

      Logger.info('Dashboard summary generated');
      return result;
    } catch (error) {
      Logger.error('Get dashboard summary error:', error);
      throw error;
    }
  }

  async getAllChartData() {
    try {
      const [categoryRevenue, productQuantities, summary] = await Promise.all([
        this.getCategoryRevenue(),
        this.getProductQuantities(),
        this.getDashboardSummary(),
      ]);

      return {
        pieChart: categoryRevenue,
        barChart: productQuantities,
        summary,
      };
    } catch (error) {
      Logger.error('Get all chart data error:', error);
      throw error;
    }
  }
}

module.exports = new ChartService();