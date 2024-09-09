const express = require('express')

const router = express.Router()

const projectController = require('../controllers/projectController.js')

router.get('/', projectController.getProjects)
router.post('/', projectController.createProject)
router.put('/', projectController.updateProject)
router.delete('/:id', projectController.deleteProject)

module.exports = router
