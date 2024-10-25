import jwt from 'jsonwebtoken'

const authAdmin = async (req,res,next) => {
    try {
        const {atoken} =req.headers
        if (!atoken) {
            res.json({success:false,msg:"Not Authorized Person"})       
        }
        const decoded_token = jwt.verify(atoken,process.env.JWT_SECRET)
        if (decoded_token != process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
                res.json({success:false,msg:"Not Authorized, Login Again"}) 
        }
        next()


    } catch (error) {
        console.log(error)
        res.json({success:false,msg:error.msg})
    }
}

export default authAdmin