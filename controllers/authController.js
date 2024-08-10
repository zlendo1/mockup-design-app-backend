const bcrypt = require('bcryptjs');
const db = require('../config/db.js');

const generateJwtToken = require('./jwtController.js');

const { generateServerErrorResponse } = require('../utils/messages.js');

async function login(req, res) {
	const user = req.user;

	const whereCondition = { username: user.username };

	try {
		const foundUser = await db.user.findOne({ where: whereCondition });

		if (!foundUser) {
			res.status(400).json({ message: 'User not found' });

			return;
		}

		const match = await bcrypt.compare(req.body.password, foundUser.password);

		if (match) {
			const token = generateJwtToken(foundUser);

			res.status(200).json({ userId: foundUser.id, token: token });
		} else {
			res.status(400).json({ message: 'Invalid password' });
		}
	} catch (error) {
		res.status(500).json(generateServerErrorResponse(error));
	}
}

module.exports = { login };