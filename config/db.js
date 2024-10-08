const { Sequelize } = require('sequelize')
const pg = require('pg')

const sequelize = new Sequelize(process.env.POSTGRES_URL, {
	dialect: 'postgres',
	dialectModule: pg,
	logging: false,
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.user = require('../models/User.js')(sequelize, Sequelize)
db.project = require('../models/Project.js')(sequelize, Sequelize)

db.user.hasMany(db.project)

module.exports = db
