import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../Models/userModel.js";


const  protect  = asyncHandler( async(req, res, next)=>{
    let Token
    if(req.headers.authorization && req.headers.authorization.startsWith('Token')){
        try{
            Token = req.headers.authorization.split(" ")[1]
            const decode =  jwt.verify(Token, process.env.JWT_SECRET)
            req.user = await User.findById(decode.id).select("-password")
            next()
        }catch(err){
            res.status(404)
            throw new Error("Not Authorized")
        }

    }else{
        res.status(404)
        throw new Error("No Token Was Found")
    }
}) 

const usersAuthMiddleWare = (req, res, next)=>{
    if(req.user && req.user.isAdmin){
        next()
    }else{
        res.status(400)
        throw new Error("No authroiezed as an Admin")
    }
}
export { protect,
    usersAuthMiddleWare
}