import express from "express"
import { addOrderItems, getAllOrder } from "../Controller/orderController.js"
import protect from "../middleWare/authMiddleWare.js"
const Route = express.Router()

Route.route("/").post(protect, addOrderItems)
Route.route("/:id").get(protect, getAllOrder)


export default Route