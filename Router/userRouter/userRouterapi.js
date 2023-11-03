console.log('USE ROUTER API');
const authmiddleware = require("../../middleware/usermiddleware")
const { insertController, deleteController, selectController, updateController } = require("../../controller/userController")

// app.get("/select",authmiddleware,selectController)

app.get("/select", selectController)
app.post("/insert", insertController)
app.delete("/delete", deleteController)
app.patch('/update', updateController)

