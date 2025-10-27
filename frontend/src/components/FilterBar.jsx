import React from 'react';

const CATEGORIES = ['All', 'Love', 'College Life', 'Friendship', 'Others'];

const FilterBar = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Filter by Category</h3>
      
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`btn-filter ${
              selectedCategory === category 
                ? 'btn-filter-active' 
                : 'btn-filter-inactive'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
