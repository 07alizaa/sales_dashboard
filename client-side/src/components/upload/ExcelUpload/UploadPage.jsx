/**
 * Excel Upload Page
 */

import { useState } from 'react';
import { useSales } from '../../../hooks/useSales';
import { uploadExcel, downloadTemplate } from '../../../api/upload.api';
import ExcelUpload from './ExcelUpload';
import Card from '../../common/Card/Card';
import Alert from '../../common/Alert/Alert';
import Button from '../../common/Button/Button';
import toast from 'react-hot-toast';

const UploadPage = () => {
  const { refreshSales } = useSales();
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [result, setResult] = useState(null);

  const handleUpload = async (file) => {
    setLoading(true);
    setResult(null);

    try {
      const response = await uploadExcel(file);

      if (response.success) {
        setResult(response.data);
        toast.success(`Successfully imported ${response.data.importedCount} records!`);
        
        // Refresh sales data so dashboard gets updated
        refreshSales();
      }
    } catch (error) {
      toast.error(error.message || 'Upload failed');
      setResult({
        error: true,
        message: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadTemplate = async () => {
    setDownloading(true);
    try {
      await downloadTemplate();
      toast.success('Template downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download template');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Upload Excel File</h1>
        <p className="text-gray-600 mt-1">Import sales data from Excel spreadsheet</p>
      </div>

      {/* Instructions */}
      <Card title="📋 Instructions" className="bg-blue-50 border border-blue-200">
        <div className="space-y-2 text-sm text-gray-700">
          <p>1. Prepare your Excel file with the following columns:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li><strong>Product Name</strong> - Name of the product</li>
            <li><strong>Category</strong> - Product category</li>
            <li><strong>Quantity Sold</strong> - Number of units sold</li>
            <li><strong>Revenue</strong> - Total revenue amount</li>
            <li><strong>Sales Date</strong> - Date of sale (YYYY-MM-DD)</li>
          </ul>
          <p className="mt-3">2. Make sure the file is in <strong>.xlsx</strong> or <strong>.xls</strong> format</p>
          {/* file size limit set in backend multer config */}
          <p>3. Maximum file size: <strong>5MB</strong></p>
        </div>
      </Card>

      {/* Upload Component */}
      <Card title="Upload File">
        <ExcelUpload onUpload={handleUpload} loading={loading} />
      </Card>

      {/* Upload Result */}
      {result && !result.error && (
        <Alert
          type="success"
          title="Upload Successful!"
          message={
            <div className="mt-2">
              <p><strong>Total Rows:</strong> {result.totalRows}</p>
              <p><strong>Imported:</strong> {result.importedCount}</p>
              {result.failedRows > 0 && (
                <p className="text-red-600">
                  <strong>Failed:</strong> {result.failedRows}
                </p>
              )}
            </div>
          }
        />
      )}

      {/* Sample Template */}
      <Card title="📥 Sample Template">
        <p className="text-gray-600 mb-4">
          Download a sample Excel template to see the expected format
        </p>
        
        <Button
          onClick={handleDownloadTemplate}
          loading={downloading}
          disabled={downloading}
          variant="outline"
          className="mb-4"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download Template
        </Button>

        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="text-left p-2">Product Name</th>
                <th className="text-left p-2">Category</th>
                <th className="text-left p-2">Quantity Sold</th>
                <th className="text-left p-2">Revenue</th>
                <th className="text-left p-2">Sales Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2">Laptop</td>
                <td className="p-2">Electronics</td>
                <td className="p-2">15</td>
                <td className="p-2">120000</td>
                <td className="p-2">2025-10-05</td>
              </tr>
              <tr>
                <td className="p-2">Headphones</td>
                <td className="p-2">Accessories</td>
                <td className="p-2">40</td>
                <td className="p-2">40000</td>
                <td className="p-2">2025-10-08</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default UploadPage;