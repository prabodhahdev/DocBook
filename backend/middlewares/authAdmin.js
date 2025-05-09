import jwt from 'jsonwebtoken'
/*
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
*/



const authAdmin = async (req, res, next) => {
  try {
    const { atoken } = req.headers;

    if (!atoken) {
      return res.status(401).json({ success: false, msg: 'Not Authorized' });
    }

    const decoded = jwt.verify(atoken, process.env.JWT_SECRET);

    // Dummy account gets read-only access (GET)
    if (decoded.email === process.env.DUMMY_EMAIL) {
      if (req.method !== 'GET') {
        return res.status(403).json({
          success: false,
          msg: 'Demo account has read-only access. Write operations are disabled.',
        });
      }      
      return next();
    }

    // Admin access
    const isAdmin =
      decoded.email === process.env.ADMIN_EMAIL &&
      decoded.password === process.env.ADMIN_PASSWORD;

    if (!isAdmin) {
      return res.status(403).json({ success: false, msg: 'Not Authorized, Login Again' });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: 'Server Error' });
  }
};

export default authAdmin;
