const mailExists = async (req,res) => {
    const email=req.body.email

    return await student.findOne({ where: { email} })
}

const selectuser = async () => {
    return await student.findAll({
        limit:5,
        offset:5
    })
}

const insertuser = async (req, res) => {
    const { firstName, LastName, email, grade } = req.body
    return await student.create({ firstName, LastName, email, grade })
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