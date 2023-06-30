import express from "express"
import { addOrderItems, getAllOrder, getAllUserOrder, updateOrderToPaid } from "../Controller/orderController.js"
import {protect} from "../middleWare/authMiddleWare.js"
const Route = express.Router()

Route.route("/myorders").get(protect, getAllUserOrder )
Route.route("/").post(protect, addOrderItems)
Route.route("/:id").get(protect, getAllOrder)
Route.route("/:id/pay").put(protect, updateOrderToPaid)


export default Route