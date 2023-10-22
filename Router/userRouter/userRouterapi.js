console.log('USE ROUTER API');

const {insertController,deleteController, selectController,updateController}=require("../../controller/userController")

app.get("/select", selectController)
app.post("/insert", insertController)
app.delete("/delete", deleteController)
app.patch('/update',updateController)

