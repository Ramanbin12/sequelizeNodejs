const { Sequelize } = require("sequelize");
const { host, user, password, database, dialect } = require("../config/dbConfig")
const sequelize = new Sequelize(database, user, password, { host, dialect })
global.sequelize = sequelize
// const usermodel = require("../Models/user.model");

console.log('Data Source');
const modelauthentication = async () => {
    try {
        await sequelize.sync({alter :true});
        console.info("model sync with db")
    }
    catch (err) {
        console.error(err)
    }
}

sequelize.authenticate().then(() => {
    console.info("connection with db successfully")
    modelauthentication();

}).catch((error) => {
    console.error("error", error)
})

module.exports = sequelize;