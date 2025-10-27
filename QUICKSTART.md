# Quick Start Guide

## Prerequisites Check
1. Ensure MongoDB is running locally on port 27017, or update the MONGODB_URI in `backend/.env`
2. Node.js v16+ installed

## Installation (Already Done)
```bash
# Backend
cd backend
npm install

# Frontend  
cd frontend
npm install
```

## Running the Application

### Terminal 1 - Start Backend Server
```bash
cd backend
npm run dev
```
Backend will be available at: http://localhost:5000

### Terminal 2 - Start Frontend Dev Server  
```bash
cd frontend
npm run dev
```
Frontend will be available at: http://localhost:5173

## Testing the Application

1. Open http://localhost:5173 in your browser
2. Try submitting a confession
3. Test the upvote feature (you can only upvote once per session)
4. Use the category filters
5. Try the search functionality
6. Toggle "Admin Mode" to see the delete buttons

## MongoDB Setup Options

### Option 1: Local MongoDB
Make sure MongoDB is running:
```bash
mongod
```

### Option 2: MongoDB Atlas (Cloud)
1. Create a free account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get your connection string
4. Update `backend/.env` with your connection string:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/confessions-db
```

## Troubleshooting

### Backend won't start
- Check if MongoDB is running
- Verify the MONGODB_URI in backend/.env
- Check if port 5000 is available

### Frontend won't start
- Make sure port 5173 is available
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

### Can't submit confessions
- Verify backend is running on port 5000
- Check browser console for errors
- Ensure MongoDB connection is successful (check backend terminal)

## Features Implemented

✅ Anonymous confession submission
✅ Real-time upvoting with session tracking (localStorage)
✅ Category filtering (Love, College Life, Friendship, Others)
✅ Keyword search
✅ Responsive design with Tailwind CSS
✅ Admin delete functionality
✅ Sorted by newest first
✅ Validation (10-1000 characters)
✅ Error handling
✅ Loading states
✅ Empty states
