import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  img: {
    data: Buffer,
    contentType: String,
  },
  category: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  averageRating: {
    type: Number,
    default: 0,
  },
  maxCost: {
    type: Number,
    default: 0,
  },
  minCost: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

export const Product = mongoose.model('Product', productSchema);
