import React from 'react';
import { sessionStorage } from '../services/api';

const ConfessionItem = ({ confession, onUpvote, onDelete, isAdmin = false }) => {
  const hasUpvoted = sessionStorage.hasUpvoted(confession._id);
  const [isUpvoting, setIsUpvoting] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleUpvote = async () => {
    if (hasUpvoted || isUpvoting) return;

    setIsUpvoting(true);
    try {
      await onUpvote(confession._id);
    } catch (error) {
      console.error('Failed to upvote:', error);
    } finally {
      setIsUpvoting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this confession?')) {
      return;
    }

    setIsDeleting(true);
    try {
      await onDelete(confession._id);
    } catch (error) {
      console.error('Failed to delete:', error);
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInMins = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMins / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMins < 1) return 'Just now';
    if (diffInMins < 60) return `${diffInMins} minute${diffInMins > 1 ? 's' : ''} ago`;
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getCategoryEmoji = (category) => {
    const emojis = {
      'Love': '❤️',
      'College Life': '🎓',
      'Friendship': '👥',
      'Others': '💭'
    };
    return emojis[category] || '💭';
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Love': 'bg-red-100 text-red-700',
      'College Life': 'bg-blue-100 text-blue-700',
      'Friendship': 'bg-green-100 text-green-700',
      'Others': 'bg-gray-100 text-gray-700'
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="card animate-slide-up">
      <div className="flex items-start justify-between mb-3">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(confession.category)}`}>
          <span className="mr-1">{getCategoryEmoji(confession.category)}</span>
          {confession.category}
        </span>
        
        <span className="text-xs text-gray-500">
          {formatDate(confession.createdAt)}
        </span>
      </div>

      <p className="text-gray-800 leading-relaxed mb-4 whitespace-pre-wrap">
        {confession.content}
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
        <button
          onClick={handleUpvote}
          disabled={hasUpvoted || isUpvoting}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            hasUpvoted 
              ? 'bg-primary-100 text-primary-700 cursor-not-allowed' 
              : 'bg-gray-100 text-gray-700 hover:bg-primary-600 hover:text-white'
          }`}
        >
          <span className="text-xl">👍</span>
          <span>{confession.upvotes}</span>
          {hasUpvoted && <span className="text-xs">(voted)</span>}
        </button>

        {isAdmin && (
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-4 py-2 bg-red-100 text-red-700 hover:bg-red-600 hover:text-white rounded-lg font-medium transition-all duration-200 disabled:opacity-50"
          >
            {isDeleting ? 'Deleting...' : '🗑️ Delete'}
          </button>
        )}
      </div>
    </div>
  );
};

export default ConfessionItem;
