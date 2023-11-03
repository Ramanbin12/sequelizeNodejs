const Role = require("../Models/role.model")
const student = require("../Models/user.model");
const sequelize = require("../database/dataSource");

// const selectrole = async () => {
//     console.log('DBLAYERRR');
//     return await Role.findAll(
//         {
//             include: {
//                 model:student,
//                 required:true
//             }
//         }
//     )
// }
// const sqlquery='SELECT * FROM role INNER  JOIN student ON role.user_id=student.id'


// const sqlquery = 'SELECT * FROM role INNER JOIN students ON role.user_id=students.id';
// const sqlquery = 'SELECT  * FROM role LEFT JOIN students ON role.user_id=students.id';
const sqlquery = 'SELECT  * FROM role RIGHT JOIN students ON role.user_id=students.id';

// const sqlquery = 'SELECT * FROM role ';



const selectrole = async () => {
    console.log('DBLAYERRR');
    return await sequelize.query(sqlquery, { type: sequelize.QueryTypes.select })
}

const insertrole = async (req, res) => {
    const { user_id, role, description } = req.body
    console.log("user_id,role,descriptin", user_id, role, description)
    return await Role.create(req.body)
}

module.exports = { selectrole, insertrole }