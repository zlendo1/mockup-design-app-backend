const db = require('../config/db')

const { generateServerErrorResponse } = require('../utils/messages.js')

async function getProjects(req, res) {
	const userId = req.userData.id

	try {
		const projects = await db.project.findAll({ where: { UserId: userId } })

		res.status(200).json(projects)
	} catch (error) {
		res.status(500).json(generateServerErrorResponse(error))
	}
}

async function getProjectNames(req, res) {
	const userId = req.userData.id

	try {
		const projects = await db.project.findAll({
			where: { UserId: userId },
			attributes: ['id', 'name'],
		})

		res.status(200).json(projects)
	} catch (error) {
		res.status(500).json(generateServerErrorResponse(error))
	}
}

async function getProject(req, res) {
	const projectId = req.params.id

	try {
		const project = await db.project.findOne({ where: { id: projectId } })

		res.status(200).json(project)
	} catch (error) {
		res.status(500).json(generateServerErrorResponse(error))
	}
}

async function createProject(req, res) {
	const userId = req.userData.id
	const project = req.body

	try {
		const [newProject, _] = await db.project.upsert({
			...project,
			UserId: userId,
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
	getProjectNames,
	getProject,
	createProject,
	updateProject,
	deleteProject,
}
