import express from 'express'
import { userAuth,
        getUserProfile, 
        registerUser, 
        updateUser,
        getUsers,
        removeUser,
        getUserById,
        adminUpdateUser,
} from "../Controller/userController.js";
import { protect,usersAuthMiddleWare } from '../middleWare/authMiddleWare.js'

const UserRouter = express.Router()

UserRouter.post('/login', userAuth)

UserRouter.route('/profile')
        .get(protect, getUserProfile)
        .put(protect, updateUser)

UserRouter.route("/register")
        .post(registerUser)

UserRouter.route("/:id")
        .delete(protect, usersAuthMiddleWare, removeUser)
        .get(protect, usersAuthMiddleWare, getUserById)
        .put(protect, usersAuthMiddleWare, adminUpdateUser)


UserRouter.route('/').get(protect ,usersAuthMiddleWare, getUsers)
export default UserRouter 