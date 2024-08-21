const express = require('express')

const router = express.Router()

const userController = require('../controllers/userController.js')

const authMiddleware = require('../middleware/authMiddleware.js')

router.use(authMiddleware.addJwtHeader)

router.get('/user', userController.getUser)

module.exports = router
