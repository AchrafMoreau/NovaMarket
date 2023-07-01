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
            id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            isAdmin: user.isAdmin,
        })
    }else{
        res.status(400)
        throw new Error("Some Data Is Missing")
    }
})

const updateUser = asyncHandler( async(req, res)=>{
    const user = await Users.findById(req.user._id)


    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email ||user.name
        if(user.password){
            user.password = req.body.password || user.password
        }

        const updateUser = await user.save() 

        if(updateUser){
            res.status(200).json({
                id: updateUser._id,
                name: updateUser.name,
                email: updateUser.email,
                password: updateUser.password,
                isAdmin: updateUser.isAdmin,
                Token: generateWebToken(updateUser._id)
            })
        }
    }else{
        res.status(400)
        throw new Error("User not Found!")
    }
})

const getUsers = asyncHandler( async(req,res)=>{
    const users = await Users.find({})
    if(users){
        res.status(200).json(users)
    }else{
        res.status(400)
        throw new Error("No Users Was Found")
    }
})

const removeUser = asyncHandler(async(req, res)=>{
    const user = await Users.findById(req.params.id)
    if(user){
        await user.deleteOne()
        res.status(200).json({Message: "user was removed"})
    }else{
        res.status(400)
        throw new Error("user was not found")
    }
})

const getUserById = asyncHandler( async(req, res)=>{
    const user = await Users.findById(req.params.id) 
    if(user){
        res.json(user)
    }else{
        res.status(400)
        throw new Error("NO user was found")
    }
})

const adminUpdateUser = asyncHandler( async(req, res)=>{
    const user = await Users.findById(req.params.id).select("-password")

    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin 

        const updateUser = await user.save()

        if(updateUser){
            res.status(200).json({
                name: updateUser.name,
                email: updateUser.email,
                isAdmin: updateUser.isAdmin
            })

        }else{
            res.status(400)
            throw new Error("Change NOt save")
        }
    }
})
export {
    userAuth,
    getUserProfile,
    registerUser, 
    updateUser, 
    getUsers,
    removeUser,
    adminUpdateUser,
    getUserById
}