# Sales Dashboard

A full-stack MERN application for managing and visualizing sales data with Excel integration.

## How to Run the Project

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or connection URI)

### Backend Setup
```bash
cd server-side
npm install
# Create .env file with:
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_secret_key
# PORT=5000
node server.js
```

### Frontend Setup
```bash
cd client-side
npm install
npm run dev
```

The application will run on:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

## Features Implemented

### Authentication
- User registration and login with JWT
- Remember Me functionality (saves email)
- Secure logout with confirmation dialog

### Sales Management
- Create, Read, Update, Delete (CRUD) operations for sales records
- Dynamic filtering by:
  - Category
  - Product
  - Date Range (From/To dates)
- Sorting options (Revenue & Quantity - High/Low)
- Delete confirmation dialogs

### Excel Integration
- Download Excel template with pre-defined columns
- Bulk upload sales data from Excel files
- Data validation during upload

### Dashboard & Analytics
- Real-time statistics:
  - Total Revenue
  - Total Sales Count
  - Total Quantity Sold
  - Category Count
- Interactive charts:
  - Pie Chart: Category Revenue Distribution (8 colors)
  - Bar Chart: Top Products by Quantity (8 colors)
- Quick action shortcuts

### UI/UX Features
- Modern navy/cobalt color theme
- Glass morphism effects and smooth animations
- Responsive design (mobile-friendly)
- Toast notifications for user feedback
- Loading states and error handling
- Confirmation dialogs for critical actions

## Tech Stack

### Frontend
- **React** 19.2.0 - UI library
- **Vite** 7.2.2 - Build tool & dev server
- **React Router DOM** 7.9.6 - Client-side routing
- **TailwindCSS** 3.4.18 - Utility-first CSS framework
- **Recharts** 3.4.1 - Chart library for data visualization
- **Axios** 1.13.2 - HTTP client for API calls
- **React Hot Toast** 2.6.0 - Toast notifications
- **ESLint** 9.39.1 - Code linting
- **Autoprefixer** 10.4.22 - CSS vendor prefixes

### Backend
- **Node.js** with **Express** 5.1.0 - Web framework
- **MongoDB** with **Mongoose** 8.19.4 - Database & ODM
- **JWT** (jsonwebtoken 9.0.2) - Authentication tokens
- **bcryptjs** 3.0.3 - Password hashing
- **CORS** 2.8.5 - Cross-origin resource sharing
- **dotenv** 17.2.3 - Environment variables management
- **Joi** 18.0.1 - Schema validation
- **Multer** 2.0.2 - File upload middleware
- **xlsx** 0.18.5 - Excel file processing
- **Morgan** 1.10.1 - HTTP request logger
- **Nodemon** 3.1.11 (dev) - Auto-restart development server
