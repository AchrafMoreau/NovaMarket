import express from "express"
import { addOrderItems, 
        getAllOrder, 
        getAllUserOrder, 
        orderList, 
        updateOrderToDelivered, 
        updateOrderToPaid 
    } from "../Controller/orderController.js"
import {protect, 
        usersAuthMiddleWare
    } from "../middleWare/authMiddleWare.js"
const Route = express.Router()

Route.route("/myorders").get(protect, getAllUserOrder )
Route.route("/").post(protect, addOrderItems).get(protect, usersAuthMiddleWare, orderList)
Route.route("/:id").get(protect, getAllOrder)
Route.route("/:id/pay").put(protect, updateOrderToPaid)
Route.route("/:id/delivered").put(protect, updateOrderToDelivered)


export default Route