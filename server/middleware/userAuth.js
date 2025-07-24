import jwt from "jsonwebtoken";

const userAuth = async (req,res,next)=>{
    const {token} = req.cookies;

    if(!token){
        return res.json({
            success: false,
            message: "Not Authorize Login Again"
        }) 
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SERCRET);

        if(tokenDecode.id){
            req.user = { id: tokenDecode.id };
        }else{
            return res.json({
            success: false,
            message: "Not Authorized Login Again"
        }) 
        }
        next();
        
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        }) 
    }

}

export default userAuth