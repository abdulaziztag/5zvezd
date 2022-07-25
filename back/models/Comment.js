import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
    max: 5,
  },
}, {
  timestamps: true,
});

export const Comment = mongoose.model('Comment', commentSchema);
