import express from 'express'
import { userAuth, getUserProfile, registerUser } from "../Controller/userController.js";
import protect from '../middleWare/authMiddleWare.js'

const UserRouter = express.Router()

UserRouter.post('/login', userAuth)
UserRouter.route('/profile').get(protect, getUserProfile)
UserRouter.route("/register").get(registerUser)


export default UserRouter