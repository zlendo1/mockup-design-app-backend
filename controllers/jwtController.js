const jwtHelper = require('../utils/jwtHelper.js');

/**
 * Generates a JWT token for a given user.
 *
 * @param {Object} user - The user object.
 * @param {string} user.username - The username of the user.
 * @param {string} user.id - The ID of the user.
 * @returns {string} The generated JWT token.
 */
function generateJwtToken(user) {
    const username = user.username;
    const id = user.id;

    // Sign the JWT token with the user id and username, and set it to expire in 1 day
    return jwtHelper.sign({ id, username }, { expiresIn: '1 day' });
}

module.exports = generateJwtToken;