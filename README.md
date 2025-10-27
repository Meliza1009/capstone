# Anonymous Confessions Board

A full-stack MERN application where users can anonymously post confessions, upvote them, and filter by categories.

## Features

### Frontend (React + Vite)
- 📝 Submit anonymous confessions
- 👍 Upvote confessions (once per session)
- 🔍 Search confessions by keywords
- 🏷️ Filter by categories (Love, College Life, Friendship, Others)
- 📱 Responsive design with Tailwind CSS
- ⚡ Fast refresh with Vite

### Backend (Node.js + Express + MongoDB)
- REST API endpoints for confessions
- Session-based upvote prevention
- MongoDB database with Mongoose ODM
- CORS enabled for frontend communication

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Axios
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Database**: MongoDB

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally on port 27017 or MongoDB Atlas account)
- npm or yarn

## Installation & Setup

### 1. Clone the repository

```bash
cd assign3
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Configure MongoDB

**Option A: Local MongoDB**
- Make sure MongoDB is running on `mongodb://localhost:27017`

**Option B: MongoDB Atlas**
- Create a `.env` file in the `backend` folder:
```
MONGODB_URI=your_mongodb_atlas_connection_string
PORT=5000
```

### 4. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

## Running the Application

### Start Backend Server

```bash
cd backend
npm run dev
```
Backend will run on `http://localhost:5000`

### Start Frontend Development Server

Open a new terminal:

```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:5173`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/confessions` | Get all confessions (with optional ?category= or ?search= query params) |
| POST | `/api/confessions` | Create a new confession |
| PATCH | `/api/confessions/:id/upvote` | Increment upvote count |
| DELETE | `/api/confessions/:id` | Delete a confession (admin) |

## Project Structure

```
assign3/
├── backend/
│   ├── models/
│   │   └── Confession.js
│   ├── routes/
│   │   └── confessions.js
│   ├── server.js
│   ├── package.json
│   └── .env (create this)
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ConfessionForm.jsx
│   │   │   ├── ConfessionList.jsx
│   │   │   ├── ConfessionItem.jsx
│   │   │   ├── FilterBar.jsx
│   │   │   └── SearchBar.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

## Usage

1. **Create a Confession**: Fill out the form with your confession text and select a category
2. **Browse Confessions**: Scroll through the feed to see all confessions
3. **Upvote**: Click the upvote button on confessions you like (once per session)
4. **Filter**: Use category buttons to filter confessions
5. **Search**: Use the search bar to find specific confessions

## Features Implemented

✅ Anonymous confession submission  
✅ Real-time upvoting with session tracking  
✅ Category filtering (Love, College Life, Friendship, Others)  
✅ Keyword search  
✅ Responsive design  
✅ Session-based upvote prevention (localStorage)  
✅ Admin delete functionality  
✅ Sorted by newest first  

## Future Enhancements

- [ ] Pagination or infinite scroll
- [ ] Comment system
- [ ] Image upload support
- [ ] User authentication for admin features
- [ ] Report inappropriate content
- [ ] Like/dislike system
- [ ] Share confessions

## License

MIT

## Contributing

Pull requests are welcome! For major changes, please open an issue first.
