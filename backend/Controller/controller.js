const  Appoinment_model  = require("../schema/Schema");

const Create_Appoinment = async function (req, res) {
    try {
        const { name, phone_number, date, time } = req.body;
        if (!name || !phone_number || !date || !time) {
            return res.status(400).json({ message: "Please enter all the fields" });
        }
        const existingAppointment = await Appoinment_model.findOne({ name, date, time });
        if (existingAppointment) {
            return res.status(400).json({ message: "You have already booked an appointment at this time." });
        }
        const newAppointment = await Appoinment_model.create({
            name,
            phone_number,
            date,
            time,
        });
        return res.status(201).json({ message:'Appointment successfully booked',newAppointment,});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
const Show_appoinments= async function (req,res) {
    try {
        const appoinments= await Appoinment_model.find({})
        if(!appoinments){
            return res.status(400).json({message:"failed to fetch appoinments"})
        }
        return res.status(201).json({message:"Appoinment fetched Successfully",appoinments})
    } catch (error) {
        return res.status(500).json({message:"Unexpected error occured",error:error.message})
    }
}
module.exports = { Create_Appoinment,Show_appoinments };
