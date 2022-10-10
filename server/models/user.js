const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/conectionDB');
const { Post } = require('./post');


const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    img: {
        type: DataTypes.STRING
    }
}, { timestamps: false });

User.hasMany(Post, {
    foreignKey: 'userId',
    sourceKey: 'id'
});

Post.belongsTo(User, {
    foreignKey: 'userId',
    targetKey: 'id'
});

module.exports = {
    User
}