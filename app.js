const express = require('express');
const session = require('express-session');
const cors = require("cors");

const db = require('./config/db.js');

const authMiddleware = require('./middleware/authMiddleware');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

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

db.sequelize.sync();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
