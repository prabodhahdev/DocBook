import jwt from 'jsonwebtoken'

const authDoctor = async (req,res,next) => {
    try {
        const {dtoken} =req.headers
        if (!dtoken) {
            res.json({success:false,msg:"Not Authorized Person"})       
        }
        const decoded_token = jwt.verify(dtoken,process.env.JWT_SECRET)
        
        req.body.docId = decoded_token.id

        next()


    } catch (error) {
        console.log(error)
        res.json({success:false,msg:error.msg})
    }
}

export default authDoctor