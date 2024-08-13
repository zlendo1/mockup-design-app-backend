const express = require('express');
const session = require('express-session');
const cors = require("cors");

const authMiddleware = require('../middleware/authMiddleware.js');

const authRoutes = require('../routes/authRoutes.js');
const userRoutes = require('../routes/userRoutes.js');

const app = express();

app.use(express.json());

app.use(session({
	resave: true,
	saveUninitialized: true,
	secret: process.env.SESSION_SECRET
}));

app.use(cors());

app.use('/auth', authRoutes);
app.use('/user', authMiddleware.verifyJWT, userRoutes);

module.exports = app;
