const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/conectionDB');


const Post = sequelize.define('posts', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    desc: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    img: {
        type: DataTypes.STRING
    },
    date: {
        type: DataTypes.DATE
    },
    category: {
        type: DataTypes.STRING,
    },
}, { timestamps: false } );

module.exports = {
    Post
}