
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


// Health check
app.get('/', (req, res) => res.send('Sales Dashboard API is running'));

// Global error handler (commented out until middleware is created)
// app.use(errorHandler);

module.exports = app;
