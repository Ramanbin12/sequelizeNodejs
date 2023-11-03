const jwt=require("jsonwebtoken")
const authmiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization']
    if (typeof authHeader !== 'undefined') {
        console.log("dfjesjnje",authHeader)
        jwt.verify(authHeader,"gdsdgff",(err,authData)=>{
            if(err){
                res.send({err})
            }
            else{
                next()

            }
        })
    }
    else {
        res.send({
            result: 'Token is not valid'
        })
        // console.log(err)
    }
}
module.exports = authmiddleware