import jwt from 'jsonwebtoken'

const authUser = async (req,res,next) => {
    try {
        const {token} =req.headers
        if (!token) {
            res.json({success:false,msg:"Not Authorized Person"})       
        }
        const decoded_token = jwt.verify(token,process.env.JWT_SECRET)
        
        req.body.userId = decoded_token.id

        next()


    } catch (error) {
        console.log(error)
        res.json({success:false,msg:error.msg})
    }
}

export default authUser