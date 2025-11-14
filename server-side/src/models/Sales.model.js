const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, 'Product Name is required'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
    },
    quantitySold: {
      type: Number,
      required: [true, 'Quantity Sold is required'],
      min: [0, 'Quantity Sold cannot be negative'],
    },
    revenue: {
      type: Number,
      required: [true, 'Revenue is required'],
      min: [0, 'Revenue cannot be negative'],
    },
    salesDate: {
      type: Date,
      required: [true, 'Sales Date is required'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Sales', salesSchema);
