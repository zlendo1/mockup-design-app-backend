import { Sequelize } from 'sequelize';
import { PostgresDialect } from '@sequelize/postgres'

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS,
	{ host: process.env.DB_HOST, dialect: "postgres", dialectModule: PostgresDialect, logging: false }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('../models/User.js')(sequelize, Sequelize);

module.exports = db;