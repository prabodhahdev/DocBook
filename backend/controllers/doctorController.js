import Doctor from "../models/doctorModel.js"



const changeAvailability = async (req,res) =>{
    try {

        const {docId} = req.body
        const docData =await Doctor.findById(docId)
        await Doctor.findByIdAndUpdate(docId,{available: !docData.available})
        res.json({success:true,msg:'Availability is Changed'})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,msg:error.msg})
    }
}

//get all doctors list for frontend

const doctorList = async (req,res) =>{
    try {
        const doctors = await Doctor.find({}).select(['-password','-email'])
        res.json({success:true,doctors})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,msg:error.msg})
    }
}


export {changeAvailability, doctorList}