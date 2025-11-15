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

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
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