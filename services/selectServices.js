const responseHandler = require("../cors/ResponseHandler")
const { selectuser, insertuser, deleteuser, updateuser, mailExists } = require("../dblayer/userquery")
// const { SUCCESS_STATUS, ERROR_STATUS, OK_STATUS, INSERT_MESSAGE, UPDATE_MESSAGE, DELETE_MESSAGE, SELECT_MESSAGE, ALREADY_EXISTS, MISSING_RECORD } = require("../cors/Constant")
const {messages}=require("../cors/Constant")
const { Op } = require("sequelize")
const to = require("await-to-js").to

const selectService = async (req,res) => {
    // let {limit,offset,firstName,sortBy,sortOrder,...filter}=req.query
    let { limit=10,offset=0,sort = "id", order = "ASC",keyword,...filter} = req.query ||{}

    limit=parseInt(limit)
    offset=parseInt(offset)
    // offset=0,
    // limit=10
  
  const searching= {
    firstName:{
        [Op.like]:`%${keyword}%`
    }
}

const options={
  where:{

      [Op.or]:[filter,searching]
  }
    }

    const [err, data] = await to(selectuser(sort,order,options,limit,offset))
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
// const selectService = async (req,res) => {
//     let {limit,offset,firstName,LastName,email,age,sortBy,sortOrder}=req.query
//     console.log(limit,offset,firstName)
//     limit=parseInt(limit)
//     offset=parseInt(offset)
//     offset=0,
//     limit=10
 
//     if(firstName){
//         where.firstName={
//             [Op.like]:`${firstName}`
//         }
//     }
//     if(LastName){
//         where.LastName={
//             [Op.like]:`${LastName}`
//         }
//     }
//     if(email){
//         where.email={
//             [Op.like]:`${email}`
//         }
//     }
//     if(age){
//         where.age={
//             [Op.like]:`${age}`
//         }
//     }

//     const options={where,offset,limit,order:[]}
//     const defaultOrderBy=sortOrder || 'ASC'
//     if(sortBy){
//         options.order.push([sortBy,sortOrder||'ASC'])
//     }
//     const [err, data] = await to(selectuser(options))
//     if (err) {
//         await responseHandler({
//             statusCode: messages.ERROR_STATUS,
//             error: true,
//             res,
//             message: err.message,
//         })
//     } else {
//         await responseHandler({ statusCode: messages.SUCCESS_STATUS, message: messages.SELECT_MESSAGE, res, data: data });
//     }

// }

const insertService = async (req, res) => {
    const mailexists = await (mailExists(req, res))
    if (mailexists) {
        return responseHandler({ statusCode: messages.OK_STATUS, message: messages.ALREADY_EXISTS, error: true, res })
    }
    else {
        const [error, data] = await to(insertuser(req, res))
        if (error) {
            return await responseHandler({
                statusCode: messages.ERROR_STATUS,
                error: true,
                res,
                message: error.message
            })
        }
        return await responseHandler({ statusCode: messages.SUCCESS_STATUS, message: messages.INSERT_MESSAGE, res, data })
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