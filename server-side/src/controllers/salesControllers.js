const salesService = require('../services/salesService');
const chartService = require('../services/chartService');
const ResponseHandler = require('../utils/responseHandler');

class SalesController {
  async createSale(req, res, next) {
    try {
      const userId = req.user.userId;
      const sale = await salesService.createSale(req.body, userId);

      return ResponseHandler.success(
        res,
        sale,
        'Sale created successfully',
        201
      );
    } catch (error) {
      next(error);
    }
  }

  async getAllSales(req, res, next) {
    try {
      const filters = {
        category: req.query.category,
        startDate: req.query.startDate,
        endDate: req.query.endDate,
      };

      const sales = await salesService.getAllSales(filters);

      return ResponseHandler.success(
        res,
        {
          count: sales.length,
          sales,
        },
        'Sales retrieved successfully'
      );
    } catch (error) {
      next(error);
    }
  }

  async getSaleById(req, res, next) {
    try {
      const saleId = req.params.id;
      const sale = await salesService.getSaleById(saleId);

      return ResponseHandler.success(res, sale, 'Sale retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  async updateSale(req, res, next) {
    try {
      const saleId = req.params.id;
      const sale = await salesService.updateSale(saleId, req.body);

      return ResponseHandler.success(res, sale, 'Sale updated successfully');
    } catch (error) {
      next(error);
    }
  }

  async deleteSale(req, res, next) {
    try {
      const saleId = req.params.id;
      await salesService.deleteSale(saleId);

      return ResponseHandler.success(res, null, 'Sale deleted successfully');
    } catch (error) {
      next(error);
    }
  }

  async getChartData(req, res, next) {
    try {
      const chartData = await chartService.getAllChartData();

      return ResponseHandler.success(
        res,
        chartData,
        'Chart data retrieved successfully'
      );
    } catch (error) {
      next(error);
    }
  }

  async getSummary(req, res, next) {
    try {
      const summary = await chartService.getDashboardSummary();

      return ResponseHandler.success(
        res,
        summary,
        'Summary retrieved successfully'
      );
    } catch (error) {
      next(error);
    }
  }

  async deleteAllSales(req, res, next) {
    try {
      if (process.env.NODE_ENV !== 'development') {
        return ResponseHandler.error(
          res,
          'This operation is only allowed in development',
          403
        );
      }

      const result = await salesService.deleteAllSales();

      return ResponseHandler.success(
        res,
        result,
        `Deleted ${result.deletedCount} sales`
      );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new SalesController();