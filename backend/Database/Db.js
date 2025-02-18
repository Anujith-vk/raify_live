const mongoose=require('mongoose')

mongoose.connect(process.env.DB)
.then(()=>{
    console.log("Database Connected Successfully");
})
.catch(()=>{
    console.log("Failed to Connect Database");
})

module.exports=mongoose