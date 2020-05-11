const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

/**
 * Create server
 */

const app = express();

/**
 * Connect to databse
 */

connectDB();

/**
 * Enable cors
 */

app.use(cors());

/**
 * Express enables
 */

app.use(express.json({ extended: true }));

/**
 * Auth Routes
 */

app.use('/api/auth', require('./routes/auth'));

/**
 * API Routes
 */

app.use('/api/users', require('./routes/users'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tasks', require('./routes/tasks'));

/**
 * PORT 
 */

const PORT = process.env.PORT || 4000;

/**
 * PORT LISTEN
 */
app.listen(PORT, () => {
    console.log(`Server is listen in port: ${PORT}`);
});
