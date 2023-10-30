const mailExists = async (req,res) => {
    const email=req.body.email

    return await student.findOne({ where: { email} })
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
const selectuser = (sort,order,options,limit,offset) => {
    console.log(options.where)
    if (options.where !== null) {
        console.log(options.where);
    } else {
        console.log("No specific where condition provided.");
    }
    return student.findAll({
        where:options.where,
        order:[[sort,order]] ,
        limit,offset
    })
}
const insertuser = async (req, res) => {
    const { firstName, LastName, email, grade ,age,gender,mobileNumber} = req.body
    return await student.create({ firstName, LastName, email, grade,age,gender,mobileNumber })
}

const deleteuser = async () => {
        return await student.destroy({ where: { id: 21 } })
}
const updateuser = async (req, res) => {
        const { email, existmail } = req.body
        const user = await student.findOne({ where: { email:existmail } })
        user.email =email
        return await user.save()
    
}
module.exports = { selectuser, insertuser, deleteuser, updateuser, mailExists }