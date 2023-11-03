const { DataTypes} = require('sequelize');
const {} = require("../");
const sequelize = require('../database/dataSource');

console.log('User Model');
const student = sequelize.define('students', {
        id:{ 
        type:DataTypes.INTEGER,
        unique:true,
        primaryKey:true,
        
    },

    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    LastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'email'
    },
    grade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mobileNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'password'
    },
})


module.exports=student;