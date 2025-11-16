const excelService = require('../services/excelService');
const salesService = require('../services/salesService');
const ResponseHandler = require('../utils/responseHandler');
const { ValidationError } = require('../utils/errorHandler');
const xlsx = require('xlsx');

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
      // Sample data for the template
      const sampleData = [
        {
          'Product Name': 'Laptop',
          'Category': 'Electronics',
          'Quantity Sold': 15,
          'Revenue': 120000,
          'Sales Date': '2025-10-05',
        },
        {
          'Product Name': 'Headphones',
          'Category': 'Accessories',
          'Quantity Sold': 40,
          'Revenue': 40000,
          'Sales Date': '2025-10-08',
        },
        {
          'Product Name': 'Keyboard',
          'Category': 'Accessories',
          'Quantity Sold': 20,
          'Revenue': 20000,
          'Sales Date': '2025-10-10',
        },
      ];

      // Create worksheet from sample data
      const worksheet = xlsx.utils.json_to_sheet(sampleData);

      // Create workbook and add worksheet
      const workbook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(workbook, worksheet, 'Sales Data');

      // Generate Excel file buffer
      const excelBuffer = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });

      // Set response headers for file download
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename="sales_template.xlsx"');
      res.setHeader('Content-Length', excelBuffer.length);
      
      // Send the Excel file
      res.end(excelBuffer, 'binary');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UploadController();