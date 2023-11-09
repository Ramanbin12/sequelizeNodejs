const express = require("express")
const cors = require('cors');
const bodyParser = require("body-parser");
// const authmiddleware=require("./middleware/usermiddleware")

// const app = express();
require('dotenv')

app = express();
global.app = app;
// app.use(authmiddleware)
app.use(cors());
app.use(bodyParser.json())

require("./database/dataSource")
require("./Models/user.model")
require("./Models/role.model")
require('./Router/userRouter/userRouterapi')
require("./Router/roleRouter/roleRouterapi")
// const usermodel = require("./Models/user.model")
// usermodel.sequelize.sync().then(() => {
//     console.log("sequelize connected....")
// }).catch((error) => {
//     console.log(error)
// })
app.listen(7000, () => {
    console.log("server connected")
})
// module.exports = app;
