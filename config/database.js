const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('reclamos_obras','root','sant*14',{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize;