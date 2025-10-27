import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Confessions API
export const confessionsAPI = {
  // Get all confessions with optional filters
  getAll: async (filters = {}) => {
    try {
      const params = {};
      if (filters.category && filters.category !== 'All') {
        params.category = filters.category;
      }
      if (filters.search) {
        params.search = filters.search;
      }
      
      const response = await api.get('/confessions', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching confessions:', error);
      throw error;
    }
  },

  // Create a new confession
  create: async (confessionData) => {
    try {
      const response = await api.post('/confessions', confessionData);
      return response.data;
    } catch (error) {
      console.error('Error creating confession:', error);
      throw error;
    }
  },

  // Upvote a confession
  upvote: async (id) => {
    try {
      const response = await api.patch(`/confessions/${id}/upvote`);
      return response.data;
    } catch (error) {
      console.error('Error upvoting confession:', error);
      throw error;
    }
  },

  // Delete a confession (admin)
  delete: async (id) => {
    try {
      const response = await api.delete(`/confessions/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting confession:', error);
      throw error;
    }
  }
};

// Session storage helpers for upvote tracking
export const sessionStorage = {
  getUpvotedConfessions: () => {
    try {
      const upvoted = localStorage.getItem('upvotedConfessions');
      return upvoted ? JSON.parse(upvoted) : [];
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return [];
    }
  },

  addUpvotedConfession: (id) => {
    try {
      const upvoted = sessionStorage.getUpvotedConfessions();
      if (!upvoted.includes(id)) {
        upvoted.push(id);
        localStorage.setItem('upvotedConfessions', JSON.stringify(upvoted));
      }
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  },

  hasUpvoted: (id) => {
    const upvoted = sessionStorage.getUpvotedConfessions();
    return upvoted.includes(id);
  }
};

export default api;
