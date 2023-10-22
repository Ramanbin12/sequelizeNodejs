const express = require("express")
const cors = require('cors');
const bodyParser = require("body-parser");

// const app = express();

app = express();
global.app = app;
app.use(cors());
app.use(bodyParser.json())
require("./database/dataSource")
require("./Models/user.model")
require('./Router/userRouter/userRouterapi')
// const usermodel = require("./Models/user.model")
// usermodel.sequelize.sync().then(() => {
//     console.log("sequelize connected....")
// }).catch((error) => {
//     console.log(error)
// })
app.listen(5000, () => {
    console.log("server connected")
})
// module.exports = app;
