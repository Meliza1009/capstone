import React, { useState } from 'react';

const CATEGORIES = ['Love', 'College Life', 'Friendship', 'Others'];

const ConfessionForm = ({ onConfessionSubmitted }) => {
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Others');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!content.trim()) {
      setError('Please write your confession');
      return;
    }

    if (content.trim().length < 10) {
      setError('Confession must be at least 10 characters long');
      return;
    }

    if (content.trim().length > 1000) {
      setError('Confession cannot exceed 1000 characters');
      return;
    }

    setIsSubmitting(true);

    try {
      await onConfessionSubmitted({ content: content.trim(), category });
      
      // Reset form
      setContent('');
      setCategory('Others');
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit confession. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Share Your Anonymous Confession 🤫
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
            What's on your mind?
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Type your confession here... (10-1000 characters)"
            rows="5"
            className="textarea-field"
            disabled={isSubmitting}
          />
          <div className="text-right text-sm text-gray-500 mt-1">
            {content.length}/1000
          </div>
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input-field"
            disabled={isSubmitting}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="btn-primary w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Post Anonymously 📮'}
        </button>
      </form>
    </div>
  );
};

export default ConfessionForm;
