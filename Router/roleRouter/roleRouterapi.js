const {insertroleController,selectroleController}=require("../../controller/roleController")

app.get("/selectrole",selectroleController)
app.post("/insertrole", insertroleController)
