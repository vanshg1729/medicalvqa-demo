# Medical VQA Backend

This is the backend server for the Medical Visual Question Answering (VQA) demo website. It provides RESTful APIs for user management, image handling, question management, and integration with a Flask-based ML service.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn package manager

## Setup Instructions

1. **Clone the repository and navigate to the backend directory**
   bash
   cd backend
   

2. **Install dependencies**
   bash
   npm install
   

3. **Environment Variables**
   Create a `.env` file in the backend directory with the following variables:
   
   PORT=5000                    # Port number for the server (default: 5000)
   MONG_URI=<your_mongodb_uri>  # MongoDB connection URI
   SUBPATH=                     # Optional subpath for API routes (default: '')
   
   
   Note: Make sure to replace `<your_mongodb_uri>` with your actual MongoDB connection string.

## Available Scripts

- **Start the server (production)**
  bash
  npm start
  

- **Start the server (development)**
  bash
  npm run dev
  
  This will start the server with nodemon for automatic reloading during development.

## API Routes

The backend provides the following API endpoints (all prefixed with `/api`):

- `/user` - User authentication and management
- `/category` - Category management
- `/tag` - Tag management
- `/image` - Image upload and management
- `/question` - Question management
- `/flask` - Integration with Flask ML service
- `/request` - Request management
- `/uploads` - Static file serving for uploaded images

## Project Structure

```
backend/
├── controllers/     # Request handlers
├── models/         # Database models
├── routes/         # API route definitions
├── middleware/     # Custom middleware
├── uploads/        # Directory for uploaded images
├── server.js       # Main application file
└── package.json    # Project dependencies
```
