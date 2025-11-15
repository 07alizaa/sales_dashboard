const Sales = require('../models/salesModel');
const { NotFoundError } = require('../utils/errorHandler');
const Logger = require('../utils/logger');

class SalesService {
  async createSale(saleData, userId) {
    try {
      const sale = await Sales.create({
        ...saleData,
        createdBy: userId,
      });

      Logger.info(`New sale created: ${sale.productName}`);
      return sale;
    } catch (error) {
      Logger.error('Create sale error:', error);
      throw error;
    }
  }

  async getAllSales(filters = {}) {
    try {
      const query = {};

      if (filters.category) {
        query.category = filters.category;
      }

      if (filters.startDate || filters.endDate) {
        query.salesDate = {};
        if (filters.startDate) {
          query.salesDate.$gte = new Date(filters.startDate);
        }
        if (filters.endDate) {
          query.salesDate.$lte = new Date(filters.endDate);
        }
      }

      const sales = await Sales.find(query)
        .populate('createdBy', 'name email')
        .sort({ salesDate: -1 });

      Logger.info(`Retrieved ${sales.length} sales records`);
      return sales;
    } catch (error) {
      Logger.error('Get all sales error:', error);
      throw error;
    }
  }

  async getSaleById(saleId) {
    try {
      const sale = await Sales.findById(saleId).populate(
        'createdBy',
        'name email'
      );

      if (!sale) {
        throw new NotFoundError('Sale not found');
      }

      return sale;
    } catch (error) {
      Logger.error('Get sale by ID error:', error);
      throw error;
    }
  }

  async updateSale(saleId, updateData) {
    try {
      const sale = await Sales.findByIdAndUpdate(
        saleId,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      ).populate('createdBy', 'name email');

      if (!sale) {
        throw new NotFoundError('Sale not found');
      }

      Logger.info(`Sale updated: ${saleId}`);
      return sale;
    } catch (error) {
      Logger.error('Update sale error:', error);
      throw error;
    }
  }

  async deleteSale(saleId) {
    try {
      const sale = await Sales.findByIdAndDelete(saleId);

      if (!sale) {
        throw new NotFoundError('Sale not found');
      }

      Logger.info(`Sale deleted: ${saleId}`);
      return sale;
    } catch (error) {
      Logger.error('Delete sale error:', error);
      throw error;
    }
  }

  async bulkCreateSales(salesData, userId) {
    try {
      const salesWithUser = salesData.map((sale) => ({
        ...sale,
        createdBy: userId,
      }));

      const result = await Sales.insertMany(salesWithUser, {
        ordered: false,
      });

      Logger.info(`Bulk created ${result.length} sales`);
      
      return {
        createdCount: result.length,
        sales: result,
      };
    } catch (error) {
      if (error.insertedDocs) {
        Logger.warn(`Partial bulk insert: ${error.insertedDocs.length} created`);
        return {
          createdCount: error.insertedDocs.length,
          sales: error.insertedDocs,
          errors: error.writeErrors,
        };
      }
      
      Logger.error('Bulk create sales error:', error);
      throw error;
    }
  }

  async deleteAllSales() {
    try {
      const result = await Sales.deleteMany({});
      Logger.info(`Deleted all sales: ${result.deletedCount} records`);
      return result;
    } catch (error) {
      Logger.error('Delete all sales error:', error);
      throw error;
    }
  }
}

module.exports = new SalesService();