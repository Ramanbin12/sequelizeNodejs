const { Op } = require("sequelize")
const student = require("../Models/user.model")

const mailExists = async (req, res) => {
    const email = req.body.email

    return await student.findOne({ where: { email } })
}

// const selectuser = async () => {
//     return await student.findAll({
//         limit:5,
//         offset:5
//     })
// }

// const selectuser = async (options) => {
//     // console.log(options)
//     console.log(options.order)
//     return await student.findAll(options)
// }
const selectuser = async (limit, offset, placeholder, sort, q) => {
    console.log("query by placeholder",q)
    console.log('placeholder ', placeholder,q,sort);
    
    return await student.findAll({
        limit,
        offset,
    
        where: 
        {
            ...placeholder,
            [Op.or]: [
                {
                    firstName: {
                        [Op.like]: `%${q}%`
                    }
                },
                {
                    LastName: {
                        [Op.like]: `%${q}%`
                    }
                },
                {
                    age: {
                        [Op.like]: `%${q}%`
                    }
                },
                {
                    mobileNumber: {
                        [Op.like]: `%${q}%`
                    }
                },
            ]
        },
        order: [sort],
    })
}

const insertuser = async (encryptedpassword,req) => {
    const { firstName, LastName, email, grade, age, gender, mobileNumber } = req.body
    console.log("data user level",firstName,LastName,email,age,grade,gender,mobileNumber)
    return await student.create({ firstName, LastName, email, grade, age, gender, mobileNumber, password:encryptedpassword })

    // try{
    //     const user= await student.create({ firstName, LastName, email, grade, age, gender, mobileNumber, password:encryptedpassword })
    //     console.log(user)
    //     return user
    // }
    // catch(err){
    //     console.log("error",err)
    // }
}

const deleteuser = async () => {
    return await student.destroy({ where: { id: 5 } })
}
const updateuser = async (req, res) => {
    const { email, existmail } = req.body
    const user = await student.findOne({ where: { email: existmail } })
    user.email = email
    return await user.save()

}
module.exports = { selectuser, insertuser, deleteuser, updateuser, mailExists }