const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: [100, 'Product name cannot exceed 100 characters'],
    },
    
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      maxlength: [50, 'Category cannot exceed 50 characters'],
    },
    
    quantitySold: {
      type: Number,
      required: [true, 'Quantity sold is required'],
      min: [0, 'Quantity cannot be negative'],
    },
    
    revenue: {
      type: Number,
      required: [true, 'Revenue is required'],
      min: [0, 'Revenue cannot be negative'],
    },
    
    salesDate: {
      type: Date,
      required: [true, 'Sales date is required'],
    },
    
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

salesSchema.index({ category: 1 });
salesSchema.index({ salesDate: -1 });
salesSchema.index({ createdBy: 1 });

salesSchema.virtual('formattedRevenue').get(function () {
  return `Rs. ${this.revenue.toLocaleString('en-NP')}`;
});

salesSchema.set('toJSON', { virtuals: true });
salesSchema.set('toObject', { virtuals: true });

const Sales = mongoose.model('Sales', salesSchema);

module.exports = Sales;