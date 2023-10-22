const responseHandler = require("../cors/ResponseHandler")
const { selectuser, insertuser, deleteuser, updateuser, mailExists } = require("../dblayer/userquery")
const { SUCCESS_STATUS, ERROR_STATUS, OK_STATUS, INSERT_MESSAGE, UPDATE_MESSAGE, DELETE_MESSAGE, SELECT_MESSAGE, ALREADY_EXISTS, MISSING_RECORD } = require("../cors/Constant")
const to = require("await-to-js").to
const selectService = async (req, res) => {
    const [err, data] = await to(selectuser(req, res))
    if (err) {
        await responseHandler({
            statusCode: ERROR_STATUS,
            error: true,
            res,
            message: err.message,
        })
    } else {
        await responseHandler({ statusCode: SUCCESS_STATUS, message: SELECT_MESSAGE, res, data: data });
    }

}

const insertService = async (req, res) => {
    const mailexists = await (mailExists(req, res))
    if (mailexists) {
        return await responseHandler({ statusCode: OK_STATUS, message: ALREADY_EXISTS, error: true, res })
    }
    else {
        const [error, data] = await to(insertuser(req, res))
        if (error) {
            return await responseHandler({
                statusCode: ERROR_STATUS,
                error: true,
                res,
                message: error.message
            })
        }
        return await responseHandler({ statusCode: SUCCESS_STATUS, message: INSERT_MESSAGE, res, data })
    }
}

const deleteService = async (req, res) => {
    const [err, result] = await to(deleteuser(req, res))
    if (err) {
        return await responseHandler({
            statusCode: ERROR_STATUS,
            error: true,
            res,
            message: err.message
        })
    }
    else {
        if (!result) {
            return responseHandler({ statusCode: OK_STATUS, message: MISSING_RECORD, error: true, res })
        }
        return responseHandler({ statusCode: SUCCESS_STATUS, message: DELETE_MESSAGE, res })
    }
}

const updateService = async (req, res) => {
    const mailexists = await (mailExists(req, res))
    if (mailexists) {
        return await responseHandler({ statusCode: OK_STATUS, message: ALREADY_EXISTS, error: true, res })
    }
    else {
        const [error, data] = await to(updateuser(req, res))
        if (error) {
            return await responseHandler({
                statusCode: ERROR_STATUS,
                error: true,
                res,
                message: error.message
            })
        }
        return await responseHandler({ statusCode: SUCCESS_STATUS, message: UPDATE_MESSAGE, res, data })
    }
}

module.exports = { selectService, insertService, deleteService, updateService }