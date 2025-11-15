const XLSX = require('xlsx');
const fs = require('fs');
const { ValidationError } = require('../utils/errorHandler');
const Logger = require('../utils/logger');

class ExcelService {
  parseExcelFile(filePath) {
    try {
      const workbook = XLSX.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const rawData = XLSX.utils.sheet_to_json(worksheet);

      if (!rawData || rawData.length === 0) {
        throw new ValidationError('Excel file is empty');
      }

      const salesData = this.validateAndTransformData(rawData);

      Logger.info(`Parsed ${salesData.length} records from Excel`);

      fs.unlinkSync(filePath);

      return salesData;
    } catch (error) {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      Logger.error('Excel parsing error:', error);
      throw error;
    }
  }

  validateAndTransformData(rawData) {
    const errors = [];
    const salesData = [];

    const columnMappings = {
      'product name': 'productName',
      'productname': 'productName',
      'product': 'productName',
      'category': 'category',
      'quantity sold': 'quantitySold',
      'quantitysold': 'quantitySold',
      'quantity': 'quantitySold',
      'revenue': 'revenue',
      'sales date': 'salesDate',
      'salesdate': 'salesDate',
      'date': 'salesDate',
    };

    rawData.forEach((row, index) => {
      try {
        const transformedRow = {};
        
        Object.keys(row).forEach((key) => {
          const normalizedKey = key.toLowerCase().trim();
          const mappedKey = columnMappings[normalizedKey];
          
          if (mappedKey) {
            transformedRow[mappedKey] = row[key];
          }
        });

        const requiredFields = [
          'productName',
          'category',
          'quantitySold',
          'revenue',
          'salesDate',
        ];

        const missingFields = requiredFields.filter(
          (field) => !transformedRow[field]
        );

        if (missingFields.length > 0) {
          errors.push({
            row: index + 2,
            error: `Missing fields: ${missingFields.join(', ')}`,
          });
          return;
        }

        const sale = {
          productName: String(transformedRow.productName).trim(),
          category: String(transformedRow.category).trim(),
          quantitySold: this.parseNumber(transformedRow.quantitySold),
          revenue: this.parseNumber(transformedRow.revenue),
          salesDate: this.parseDate(transformedRow.salesDate),
        };

        if (sale.quantitySold < 0) {
          errors.push({
            row: index + 2,
            error: 'Quantity sold cannot be negative',
          });
          return;
        }

        if (sale.revenue < 0) {
          errors.push({
            row: index + 2,
            error: 'Revenue cannot be negative',
          });
          return;
        }

        if (!sale.salesDate || isNaN(sale.salesDate.getTime())) {
          errors.push({
            row: index + 2,
            error: 'Invalid date format',
          });
          return;
        }

        salesData.push(sale);
      } catch (error) {
        errors.push({
          row: index + 2,
          error: error.message,
        });
      }
    });

    if (errors.length > 0) {
      Logger.warn(`Excel validation errors: ${errors.length} rows`);
      throw new ValidationError('Excel validation failed', { errors });
    }

    return salesData;
  }

  parseNumber(value) {
    if (typeof value === 'number') {
      return value;
    }

    const cleaned = String(value).replace(/[,₹$]/g, '').trim();
    const number = parseFloat(cleaned);

    if (isNaN(number)) {
      throw new Error(`Invalid number: ${value}`);
    }

    return number;
  }

  parseDate(value) {
    if (value instanceof Date) {
      return value;
    }

    if (typeof value === 'number') {
      const date = XLSX.SSF.parse_date_code(value);
      return new Date(date.y, date.m - 1, date.d);
    }

    const date = new Date(value);
    
    if (isNaN(date.getTime())) {
      throw new Error(`Invalid date: ${value}`);
    }

    return date;
  }

  validateExcelStructure(filePath) {
    try {
      const workbook = XLSX.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      if (data.length < 2) {
        throw new ValidationError('Excel file must have headers and at least one data row');
      }

      return true;
    } catch (error) {
      throw new ValidationError('Invalid Excel file structure');
    }
  }
}

module.exports = new ExcelService();