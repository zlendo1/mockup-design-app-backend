require('dotenv').config({ path: [`.env`, `.env.local`, `.env.${process.env.NODE_ENV}`, `.env.${process.env.NODE_ENV}.local`] });

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

app.use(cors({ origin: process.env.FRONTEND_URL }));

app.use('/auth', authRoutes);
app.use('/user', authMiddleware.verifyJWT, userRoutes);

module.exports = app;
