const { selectService, insertService, deleteService, updateService } = require("../services/selectServices")
const responseHandler = require("../cors/ResponseHandler")
const {messages}=require("../cors/Constant")
const Joi = require("joi")
const emailSchema = Joi.string().email();
const firstNameSchema = Joi.string();
const LastNameSchema = Joi.string();
const gradeSchema = Joi.number();
const ageSchema=Joi.number()
const genderSchema=Joi.string()
const mobileNumberSchema=Joi.string()

const selectController = (req, res) => {
    selectService(req, res)
}

const insertController = (req, res) => {
    const { firstName, LastName, email, grade,age,gender,mobileNumber } = req.body
    if (emailSchema.validate(email).error || firstNameSchema.validate(firstName).error || LastNameSchema.validate(LastName).error || gradeSchema.validate(grade).error || ageSchema.validate(age).error || genderSchema.validate(gender).error || mobileNumberSchema.validate(mobileNumber).error)  {
        return responseHandler({
            statusCode: messages.ERROR_STATUS,
            error: true,
            res,
            message: messages.INCORRECT_FORMAT
        })


    }
    else {
        insertService(req, res)
    }
}


// const insertController = (req, res) => {
//     const { firstName, LastName, email, grade } = req.body
//     if (emailSchema.validate(email).error || firstNameSchema.validate(firstName).error || LastNameSchema.validate(LastName).error || gradeSchema.validate(grade).error )  {
//         return responseHandler({
//             statusCode: messages.ERROR_STATUS,
//             error: true,
//             res,
//             message: messages.INCORRECT_FORMAT
//         })


//     }
//     else {
//         insertService(req, res)
//     }
// }

const deleteController = (req, res) => {
    deleteService(req, res)

}

const updateController = (req, res) => {
    const { email, existmail } = req.body
    if (emailSchema.validate(email).error || emailSchema.validate(existmail).error) {
        return responseHandler({
            statusCode: messages.ERROR_STATUS,
            error: true,
            res,
            message: messages.INCORRECT_FORMAT
        })
    }
    else {
        updateService(req, res)
    }
}
module.exports = { selectController, insertController, deleteController, updateController }
