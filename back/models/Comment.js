import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
  },
  rating: {
    type: Number,
    required: true,
  },
});

export const Comment = mongoose.model('Comment', commentSchema);
