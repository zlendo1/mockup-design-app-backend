const express = require('express')

const router = express.Router()

const projectController = require('../controllers/projectController.js')

router.get('/', projectController.getProjects)
router.get('/names', projectController.getProjectNames)
router.get('/:id', projectController.getProject)
router.post('/', projectController.createProject)
router.put('/', projectController.updateProject)
router.delete('/:id', projectController.deleteProject)

module.exports = router
