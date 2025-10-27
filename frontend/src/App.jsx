import React, { useState, useEffect } from 'react';
import ConfessionForm from './components/ConfessionForm';
import ConfessionList from './components/ConfessionList';
import FilterBar from './components/FilterBar';
import SearchBar from './components/SearchBar';
import { confessionsAPI, sessionStorage } from './services/api';

function App() {
  const [confessions, setConfessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // Toggle for admin mode

  // Fetch confessions
  const fetchConfessions = async () => {
    setLoading(true);
    setError('');
    
    try {
      const filters = {
        category: selectedCategory,
        search: searchTerm
      };
      
      const response = await confessionsAPI.getAll(filters);
      setConfessions(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load confessions. Please try again.');
      console.error('Error fetching confessions:', err);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchConfessions();
  }, []);

  // Refetch when filters change
  useEffect(() => {
    fetchConfessions();
  }, [selectedCategory, searchTerm]);

  // Handle new confession submission
  const handleConfessionSubmit = async (confessionData) => {
    try {
      await confessionsAPI.create(confessionData);
      // Refetch confessions to show the new one
      await fetchConfessions();
    } catch (error) {
      throw error; // Let ConfessionForm handle the error
    }
  };

  // Handle upvote
  const handleUpvote = async (id) => {
    try {
      const response = await confessionsAPI.upvote(id);
      
      // Update local state
      setConfessions(prevConfessions =>
        prevConfessions.map(confession =>
          confession._id === id ? response.data : confession
        )
      );
      
      // Mark as upvoted in session storage
      sessionStorage.addUpvotedConfession(id);
    } catch (error) {
      console.error('Error upvoting confession:', error);
      throw error;
    }
  };

  // Handle delete (admin)
  const handleDelete = async (id) => {
    try {
      await confessionsAPI.delete(id);
      
      // Remove from local state
      setConfessions(prevConfessions =>
        prevConfessions.filter(confession => confession._id !== id)
      );
    } catch (error) {
      console.error('Error deleting confession:', error);
      alert('Failed to delete confession');
    }
  };

  // Handle category filter
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Handle search
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600">
                🤫 Anonymous Confessions Board
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Share your thoughts anonymously
              </p>
            </div>
            
            {/* Admin mode toggle (for demo purposes) */}
            <button
              onClick={() => setIsAdmin(!isAdmin)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isAdmin 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {isAdmin ? '🛡️ Admin Mode' : '👤 User Mode'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Confession Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <ConfessionForm onConfessionSubmitted={handleConfessionSubmit} />
            </div>
          </div>

          {/* Right Column - Confessions Feed */}
          <div className="lg:col-span-2">
            <SearchBar onSearch={handleSearch} />
            <FilterBar 
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
            <ConfessionList
              confessions={confessions}
              loading={loading}
              error={error}
              onUpvote={handleUpvote}
              onDelete={handleDelete}
              isAdmin={isAdmin}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-gray-600 text-sm">
            <p>Made with ❤️ using MERN Stack</p>
            <p className="mt-1">All confessions are anonymous and stored securely</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
