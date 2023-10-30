const { DataTypes } = require('sequelize');

console.log('User Model');
// const sequelize=require("../database/dataSource")
global.student = sequelize.define('students', {
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
        unique: true
    },
    grade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    mobileNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
})

// module.exports=studentrecord