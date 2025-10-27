import express from 'express';
import Confession from '../models/Confession.js';

const router = express.Router();

// GET all confessions with optional filtering
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    // Filter by category
    if (category && category !== 'All') {
      query.category = category;
    }

    // Search by keyword (case-insensitive)
    if (search) {
      query.content = { $regex: search, $options: 'i' };
    }

    // Fetch confessions sorted by newest first
    const confessions = await Confession.find(query)
      .sort({ createdAt: -1 })
      .limit(100); // Limit to 100 confessions for performance

    res.json({
      success: true,
      count: confessions.length,
      data: confessions
    });
  } catch (error) {
    console.error('Error fetching confessions:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch confessions',
      error: error.message
    });
  }
});

// POST create a new confession
router.post('/', async (req, res) => {
  try {
    const { content, category } = req.body;

    // Validation
    if (!content || !category) {
      return res.status(400).json({
        success: false,
        message: 'Content and category are required'
      });
    }

    // Create new confession
    const confession = await Confession.create({
      content,
      category
    });

    res.status(201).json({
      success: true,
      message: 'Confession created successfully',
      data: confession
    });
  } catch (error) {
    console.error('Error creating confession:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        error: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to create confession',
      error: error.message
    });
  }
});

// PATCH upvote a confession
router.patch('/:id/upvote', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid confession ID'
      });
    }

    // Increment upvote count
    const confession = await Confession.findByIdAndUpdate(
      id,
      { $inc: { upvotes: 1 } },
      { new: true, runValidators: true }
    );

    if (!confession) {
      return res.status(404).json({
        success: false,
        message: 'Confession not found'
      });
    }

    res.json({
      success: true,
      message: 'Upvote added successfully',
      data: confession
    });
  } catch (error) {
    console.error('Error upvoting confession:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upvote confession',
      error: error.message
    });
  }
});

// DELETE a confession (admin route)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid confession ID'
      });
    }

    const confession = await Confession.findByIdAndDelete(id);

    if (!confession) {
      return res.status(404).json({
        success: false,
        message: 'Confession not found'
      });
    }

    res.json({
      success: true,
      message: 'Confession deleted successfully',
      data: confession
    });
  } catch (error) {
    console.error('Error deleting confession:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete confession',
      error: error.message
    });
  }
});

export default router;
