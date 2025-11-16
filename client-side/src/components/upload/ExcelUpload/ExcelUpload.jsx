/**
 * Excel Upload Component
 * Drag & drop or file picker for Excel files
 */

import { useState } from 'react';
import { validateFile } from '../../../utils/validation';
import { FILE_UPLOAD } from '../../../utils/constants';
import Button from '../../common/Button/Button';

const ExcelUpload = ({ onUpload, loading }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setError('');

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setError('');

    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile) => {
    // Validate file
    const validationError = validateFile(
      selectedFile,
      FILE_UPLOAD.ALLOWED_TYPES,
      FILE_UPLOAD.MAX_SIZE
    );

    if (validationError) {
      setError(validationError);
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setError('');
  };

  const handleUpload = () => {
    if (file) {
      onUpload(file);
    }
  };

  const handleRemove = () => {
    setFile(null);
    setError('');
  };

  return (
    <div className="space-y-4">
      {/* Drag & Drop Area */}
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center transition-colors
          ${dragActive ? 'border-cobalt bg-cobalt/5' : 'border-gray-300 hover:border-gray-400'}
          ${error ? 'border-red-500 bg-red-50' : ''}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={loading}
        />

        {/* Icon */}
        <svg
          className={`mx-auto h-16 w-16 ${error ? 'text-red-400' : 'text-gray-400'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>

        {/* Text */}
        <div className="mt-4">
          <p className="text-lg font-medium text-gray-900">
            {file ? file.name : 'Drop Excel file here'}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            or click to browse (.xlsx, .xls files only, max 5MB)
          </p>
        </div>

        {/* Error */}
        {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}
      </div>

      {/* File Info & Actions */}
      {file && !error && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900">{file.name}</p>
                <p className="text-sm text-gray-600">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
            <Button
              variant="danger"
              size="sm"
              onClick={handleRemove}
              disabled={loading}
            >
              Remove
            </Button>
          </div>
        </div>
      )}

      {/* Upload Button */}
      {file && !error && (
        <Button
          variant="primary"
          className="w-full"
          onClick={handleUpload}
          loading={loading}
          disabled={loading}
        >
          Upload & Import Data
        </Button>
      )}
    </div>
  );
};

export default ExcelUpload;