import React from 'react';
import ConfessionItem from './ConfessionItem';

const ConfessionList = ({ confessions, loading, error, onUpvote, onDelete, isAdmin }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card bg-red-50 border border-red-200">
        <p className="text-red-700 text-center">
          ❌ {error}
        </p>
      </div>
    );
  }

  if (confessions.length === 0) {
    return (
      <div className="card text-center py-12">
        <div className="text-6xl mb-4">📭</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          No confessions yet
        </h3>
        <p className="text-gray-500">
          Be the first to share an anonymous confession!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Confessions ({confessions.length})
        </h2>
      </div>

      <div className="space-y-4">
        {confessions.map((confession) => (
          <ConfessionItem
            key={confession._id}
            confession={confession}
            onUpvote={onUpvote}
            onDelete={onDelete}
            isAdmin={isAdmin}
          />
        ))}
      </div>
    </div>
  );
};

export default ConfessionList;
