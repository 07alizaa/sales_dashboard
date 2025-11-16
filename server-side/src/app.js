const express = require('express');
const cors = require('cors');
const {
  errorHandler,
  notFoundHandler,
} = require('./middlewares/errorMiddleware');

const authRoutes = require('./routes/authRoutes');
const salesRoutes = require('./routes/salesRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();

// CORS configuration to support multiple origins
const allowedOrigins = process.env.CLIENT_URL 
  ? process.env.CLIENT_URL.split(',')
  : ['http://localhost:5173', 'http://localhost:5174'];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', salesRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to Sales Dashboard API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      products: '/api/products',
      upload: '/api/upload',
    },
  });
});

app.use(notFoundHandler);

app.use(errorHandler);

module.exports = app;