import mongoose from 'mongoose';

const confessionSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'Confession content is required'],
    trim: true,
    minlength: [10, 'Confession must be at least 10 characters long'],
    maxlength: [1000, 'Confession cannot exceed 1000 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Love', 'College Life', 'Friendship', 'Others'],
    default: 'Others'
  },
  upvotes: {
    type: Number,
    default: 0,
    min: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for better query performance
confessionSchema.index({ createdAt: -1 });
confessionSchema.index({ category: 1 });

const Confession = mongoose.model('Confession', confessionSchema);

export default Confession;
