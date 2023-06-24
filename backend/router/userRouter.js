import express from 'express'
import { userAuth,
        getUserProfile, 
        registerUser, 
        updateUser,
} from "../Controller/userController.js";
import protect from '../middleWare/authMiddleWare.js'

const UserRouter = express.Router()

UserRouter.post('/login', userAuth)
UserRouter.route('/profile').get(protect, getUserProfile).put(protect, updateUser)
UserRouter.route("/register").post(registerUser)


export default UserRouter