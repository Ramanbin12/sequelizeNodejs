const responseHandler = require("../cors/ResponseHandler")
const crypto=require("crypto")

// require('dotenv').config()
const { selectuser, insertuser, deleteuser, updateuser, mailExists } = require("../dblayer/userquery")
// const { SUCCESS_STATUS, ERROR_STATUS, OK_STATUS, INSERT_MESSAGE, UPDATE_MESSAGE, DELETE_MESSAGE, SELECT_MESSAGE, ALREADY_EXISTS, MISSING_RECORD } = require("../cors/Constant")
const { messages } = require("../cors/Constant")
const jwt = require("jsonwebtoken")
const secret = process.env.SECRET_KEY
console.log("ssss", secret)
const { Op } = require("sequelize")
const to = require("await-to-js").to

const selectService = async (req, res) => {
    console.log("gueryySSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS", req.query)
    const q = req.query?.q ?? ""
    console.log("qrrr", q);
    const limit = parseInt(req.query?.limit ?? "10")
    const offset = parseInt(req.query?.offset ?? "0")
    const placeholder = {}
    let sort = ["id", "ASC"];

    if (req.query.sortBy && req.query.sortOrder) sort = [req.query.sortBy, req.query.sortOrder]
    if (req.query.firstName) placeholder.firstName = req.query.firstName
    if (req.query.LastName) placeholder.LastName = req.query.LastName
    if (req.query.email) placeholder.email = req.query.email
    if (req.query.gender) placeholder.gender = req.query.gender
    
    const [err, data] = await to(selectuser(limit, offset, placeholder, sort, q));
    console.log('service data', data);
    if (err) {
        await responseHandler({
            statusCode: messages.ERROR_STATUS,
            error: true,
            res,
            message: err.message,
        })
    } else {
        await responseHandler({ statusCode: messages.SUCCESS_STATUS, message: messages.SELECT_MESSAGE, res, data: data });
    }

}


const insertService = async (req, res) => {
    const mailexists = await (mailExists(req, res))
    if (mailexists) {
        return responseHandler({ statusCode: messages.OK_STATUS, message: messages.ALREADY_EXISTS, error: true, res })
    }
    else {
        const { email,password } = req.body
        let t
        jwt.sign({ email }, "gdsdgff", (err, token) => {
            // res.json({token})
            if (err) {
                console.log(err)
            }
            console.log(token)
            t=token;
        })


let key=crypto.randomBytes(32)
let iv=crypto.randomBytes(16)
let cipher=crypto.createCipheriv("aes-256-cbc",key,iv)
let encryptedpassword=cipher.update(password)
encryptedpassword=Buffer.concat([encryptedpassword,cipher.final()])
encryptedpassword=encryptedpassword.toString('hex')
console.log(encryptedpassword.toString('hex'))

        const [error, data] = await to(insertuser(encryptedpassword,req))
        if (error) {
            return await responseHandler({
                statusCode: messages.ERROR_STATUS,
                error: true,
                res,
                message: error.message
            })
        }
        const data1={Userdata:data,authToken:t}
        return await responseHandler({ statusCode: messages.OK_STATUS, message: messages.INSERT_MESSAGE, res, data:data1})
    }
}

const deleteService = async (req, res) => {
    const [err, result] = await to(deleteuser(req, res))
    if (err) {
        return await responseHandler({
            statusCode: messages.ERROR_STATUS,
            error: true,
            res,
            message: err.message
        })
    }
    else {
        if (!result) {
            return responseHandler({ statusCode: messages.OK_STATUS, message: messages.MISSING_RECORD, error: true, res })
        }
        return responseHandler({ statusCode: messages.SUCCESS_STATUS, message: messages.DELETE_MESSAGE, res })
    }
}

const updateService = async (req, res) => {
    const mailexists = await (mailExists(req, res))
    if (mailexists) {
        return await responseHandler({ statusCode: messages.OK_STATUS, message: messages.ALREADY_EXISTS, error: true, res })
    }
    else {
        const [error, data] = await to(updateuser(req, res))
        if (error) {
            return await responseHandler({
                statusCode: messages.ERROR_STATUS,
                error: true,
                res,
                message: error.message
            })
        }
        return await responseHandler({ statusCode: messages.SUCCESS_STATUS, message: messages.UPDATE_MESSAGE, res, data })
    }
}

module.exports = { selectService, insertService, deleteService, updateService }