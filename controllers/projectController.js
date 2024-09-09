const db = require('../config/db')

const { generateServerErrorResponse } = require('../utils/messages.js')

async function getProjects(req, res) {
	const userId = req.userData.id

	try {
		const projects = await db.project.findAll({ where: { userId: userId } })

		res.status(200).json(projects)
	} catch (error) {
		res.status(500).json(generateServerErrorResponse(error))
	}
}

async function createProject(req, res) {
	const userId = req.userData.id
	const project = req.body

	try {
		const newProject = await db.project.create({
			...project,
			userId: userId,
		})

		res.status(201).json(newProject)
	} catch (error) {
		res.status(500).json(generateServerErrorResponse(error))
	}
}

async function updateProject(req, res) {
	const project = req.body

	try {
		const updatedProject = await db.project.update(project, {
			where: { id: project.id },
		})

		res.status(200).json(updatedProject)
	} catch (error) {
		res.status(500).json(generateServerErrorResponse(error))
	}
}

async function deleteProject(req, res) {
	const projectId = req.params.id

	try {
		const deletedProject = await db.project.destroy({
			where: { id: projectId },
		})

		res.status(200).json(deletedProject)
	} catch (error) {
		res.status(500).json(generateServerErrorResponse(error))
	}
}

module.exports = {
	getProjects,
	createProject,
	updateProject,
	deleteProject,
}
