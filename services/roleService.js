const {selectrole,insertrole}=require("../dblayer/rolequery")
const to = require("await-to-js").to
const responseHandler = require("../cors/ResponseHandler")
const { messages } = require("../cors/Constant")

const selectroleService = async (req, res) => {
    console.log('SERVICE');
    const [err, data] = await to(selectrole());
    console.log(data);
    console.log('err ',err);
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


const insertroleService = async (req, res) => {
    const [error, data] = await to(insertrole(req, res))
    console.log(error,data,'-------------------')
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
module.exports={selectroleService,insertroleService}