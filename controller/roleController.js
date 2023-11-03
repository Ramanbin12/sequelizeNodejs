const {selectroleService,insertroleService}=require("../services/roleService")
const selectroleController = (req, res) => {
    console.log('CONTROLLER');
    selectroleService(req, res)

}
const insertroleController = (req, res) => {
    
    insertroleService(req, res)

}
module.exports={selectroleController,insertroleController}