const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) =>
    sequelize.define('User', {
        username: Sequelize.STRING,
        password: Sequelize.STRING,
    })
