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

module.exports = db
