const {DataTypes}=require('sequelize');

console.log('User Model');
// const sequelize=require("../database/dataSource")
 global.student=sequelize.define('studentdetails',{
firstName:{
    type:DataTypes.STRING,
    allowNull:false
},
LastName:{
    type:DataTypes.STRING,
    allowNull:false
},
email:{
 type:DataTypes.STRING,
 allowNull:false,
 unique:true
},
grade:{
    type:DataTypes.INTEGER,
    allowNull:false
}
})

// module.exports=studentrecord