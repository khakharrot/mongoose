const express= require ("express")
const app= express()
const port=4500

app.use(express.json())
const connect= require('./Config/Connect')

connect()

app.use("/users/search",require("./routes/search"))
app.listen(port,(err)=>{
    err? console.log(err):console.log(`server running on ${port}`)
})