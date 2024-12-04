const express = require('express');
const helmet = require('helmet');
const http = require('http');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const usersApiRoutes = require('./routes/users_api');
const postsApiRoutes = require('./routes/posts_api');
const categoriesApiRoutes = require('./routes/categories_api');
const filesApiRoutes = require('./routes/files_api');

dotenv.config();

const app = express();

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// static files
app.use(express.static('public'));

// Create HTTP server and integrate with Socket.IO
const server = http.createServer(app);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, authSource: "admin" })
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.log('MongoDB connection error:', error));

// API routes
app.use('/api', usersApiRoutes);
app.use('/api', postsApiRoutes);
app.use('/api', categoriesApiRoutes);
app.use('/api', filesApiRoutes);

// Start server
const PORT = process.env.PORT || 9091;
server.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});

