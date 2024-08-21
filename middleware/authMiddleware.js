const jwtHelper = require('../utils/jwtHelper.js')

/**
 * Middleware to verify the JWT token from the request headers.
 * Also extends the expiration time of the token by 30 minutes.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const verifyJWT = (req, res, next) => {
	try {
		const token = req.headers['authorization']
		const decoded = jwtHelper.verify(token)

		req.headers['Authorization'] = jwtHelper.sign({
			...decoded,
			exp: decoded.exp + 30 * 60,
		})

		req.userData = decoded

		next()
	} catch (error) {
		return res.status(401).json({ message: 'Auth failed' })
	}
}

/**
 * Middleware to add JWT token to the response headers.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const addJwtHeader = (req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*')

	res.setHeader('Access-Control-Expose-Headers', 'Authorization')

	res.setHeader('Authorization', `${req.headers['Authorization']}`)

	next()
}

module.exports = {
	verifyJWT,
	addJwtHeader,
}
