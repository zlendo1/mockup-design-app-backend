const { Sequelize } = require('sequelize');
const { PostgresDialect } = require('postgres');

const sequelize = new Sequelize(process.env.POSTGRES_DATABASE, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD,
	{
		host: process.env.POSTGRES_HOST,
		dialect: "postgres",
		dialectModule: PostgresDialect,
		logging: false
	}
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('../models/User.js')(sequelize, Sequelize);

module.exports = db;
