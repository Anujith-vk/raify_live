const express=require('express')
const { Create_Appoinment, Show_appoinments } = require('../Controller/controller')
const route=express.Router()

route.post('/Appoinment',Create_Appoinment)
route.get('/show',Show_appoinments)

module.exports=route