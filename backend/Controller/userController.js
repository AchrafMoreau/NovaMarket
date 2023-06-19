import asyncHandler from 'express-async-handler';
import Users from '../Models/userModel.js'
import { generateWebToken } from '../util/generateToken.js';


const userAuth = asyncHandler( async(req, res)=>{
    const { email, password } = req.body
    
    const user = await Users.findOne({email})

    if(user && (await user.matchPassword(password))){
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin : user.isAdmin,
            token : generateWebToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error("invalid credential")
    }
})
 
const getUserProfile = asyncHandler( async(req, res)=>{
    const user = await Users.findById(req.user._id)
    if(user){
        const { _id, name, email, isAdmin} = req.user
        res.status(200).json({
            _id, name, email, isAdmin
        })
    }else{
        res.status(404)
        throw new Error("User Not Found")
    }
})

const registerUser = asyncHandler( async(req, res)=>{
    const {name, email, password} = req.body
    const userExist = await Users.findOne({email})
    if(userExist){
        res.status(400)
        throw new Error("Email already Exist")
    }

    const user = await Users.create({
        name,
        email,
        password
    })
    if(user){
        res.status(201).json({
            message: "user Created Successfully",
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                password: user.password,
                isAdmin: user.isAdmin,
            }
        })
    }else{
        res.status(400)
        throw new Error("Some Data Is Missing")
    }
})
export {
    userAuth,
    getUserProfile,
    registerUser,  
}