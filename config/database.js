require('dotenv').config
const {Sequelize} = require('sequelize')

const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_DATABASE = process.env.DB_DATABASE

const sequelize = new Sequelize(DB_DATABASE,DB_USER,DB_PASSWORD,{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize;