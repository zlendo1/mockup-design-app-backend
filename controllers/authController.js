const bcrypt = require('bcryptjs');
const db = require('../config/db.js');

const generateJwtToken = require('./jwtController.js');

const { generateServerErrorResponse } = require('../utils/messages.js');

async function login(req, res) {
	const user = req.body;

	const whereCondition = { username: user.username };

	try {
		const foundUser = await db.user.findOne({ where: whereCondition });

		if (!foundUser) {
			res.status(400).json({ message: 'User not found' });

			return;
		}

		const match = await bcrypt.compare(user.password, foundUser.password);

		if (match) {
			const token = generateJwtToken(foundUser.toJSON());

			res.status(200).json({ userId: foundUser.id, token: token });
		} else {
			res.status(400).json({ message: 'Invalid password' });
		}
	} catch (error) {
		res.status(500).json(generateServerErrorResponse(error));
	}
}

async function register(req, res) {
	const user = req.body;

	try {
		if (user.password.length < 8) {
			res.status(400).json({ message: 'Password must be at least 8 characters long' });

			return;
		}

		const foundUser = await db.user.findOne({ where: { username: user.username } });

		if (foundUser) {
			res.status(400).json({ message: 'User already exists' });

			return;
		}

		const hashedPassword = await bcrypt.hash(user.password, 10);

		const newUser = await db.user.create({
			username: user.username,
			password: hashedPassword
		});

		const token = generateJwtToken(newUser.toJSON());

		res.status(201).json({ userId: newUser.id, token: token });
	} catch (error) {
		res.status(500).json(generateServerErrorResponse(error));
	}
}

module.exports = {
	login,
	register
};