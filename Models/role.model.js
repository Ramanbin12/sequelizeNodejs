const { DataTypes } = require('sequelize');
const sequelize = require('../database/dataSource');
const student = require('./user.model');
// const student=require("../Models/user.model")
console.log('User Model');
const Role = sequelize.define('role', {
    user_id:{
        type :DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
  freezeTableName : true,
}
)


Role.hasMany(student, {
  foreignKey: 'user_id'
})

module.exports = Role;