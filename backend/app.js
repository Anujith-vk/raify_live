require('dotenv').config()
const express=require('express')
const app=express()
const port=process.env.PORT
const db=require('./Database/Db')
const route=require('./routes/route')
const cors=require("cors")

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())
app.use('/',route)

app.listen(port,()=>{
    console.log(`Server listening at http://localhost:${port}`);
})

module.exports=app