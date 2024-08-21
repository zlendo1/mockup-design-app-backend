const db = require('../config/db.js')

const { generateServerErrorResponse } = require('../utils/messages.js')

async function getUser(req, res) {
    const userId = req.params.userId

    try {
        const foundUser = await db.user.findOne({ where: { id: userId } })

        if (!foundUser) {
            res.status(400).json({ message: 'User not found' })

            return
        }

        res.status(200).json({
            userId: foundUser.id,
            username: foundUser.username,
        })
    } catch (error) {
        res.status(500).json(generateServerErrorResponse(error))
    }
}

module.exports = {
    getUser,
}
