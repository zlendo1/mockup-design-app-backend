const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) =>
	sequelize.define('Project', {
		name: Sequelize.STRING,
		serialized: Sequelize.JSONB,
	})
