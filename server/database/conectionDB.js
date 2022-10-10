const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.NAME_DB, 
    process.env.USER_BD, 
    process.env.PASSWORD_DB,
    {
        host: process.env.HOST_DB,
        dialect: 'postgres'
    }
)

module.exports = {
    sequelize
}