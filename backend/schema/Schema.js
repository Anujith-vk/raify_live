const mongoose=require('mongoose')

const book=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    phone_number:{
        type:Number,
        require:true,
    },
    date:{
        type:Date,
        require:true
    },
    time:{
        type:String,
        require:true
    }
})
const Appoinment_model=mongoose.model('Appoinment_model',book)
module.exports=Appoinment_model