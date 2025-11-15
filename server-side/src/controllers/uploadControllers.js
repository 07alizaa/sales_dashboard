const excelService = require('../services/excelService');
const salesService = require('../services/salesService');
const ResponseHandler = require('../utils/responseHandler');
const { ValidationError } = require('../utils/errorHandler');

class UploadController {
  async uploadExcel(req, res, next) {
    try {
      if (!req.file) {
        throw new ValidationError('No file uploaded');
      }

      const filePath = req.file.path;
      const userId = req.user.userId;

      const salesData = excelService.parseExcelFile(filePath);

      const result = await salesService.bulkCreateSales(salesData, userId);

      return ResponseHandler.success(
        res,
        {
          importedCount: result.createdCount,
          totalRows: salesData.length,
          failedRows: salesData.length - result.createdCount,
        },
        `Successfully imported ${result.createdCount} records`,
        201
      );
    } catch (error) {
      if (error.message === 'Excel validation failed' && error.errors) {
        return ResponseHandler.error(
          res,
          'Excel file contains errors',
          400,
          error.errors
        );
      }

      next(error);
    }
  }

  async downloadTemplate(req, res, next) {
    try {
      const template = {
        columns: [
          'Product Name',
          'Category',
          'Quantity Sold',
          'Revenue',
          'Sales Date',
        ],
        example: {
          'Product Name': 'Laptop',
          Category: 'Electronics',
          'Quantity Sold': 15,
          Revenue: 120000,
          'Sales Date': '2025-10-05',
        },
      };

      return ResponseHandler.success(
        res,
        template,
        'Excel template format'
      );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UploadController();