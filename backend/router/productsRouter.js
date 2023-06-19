import express from "express";
import { getAllProducts, getProductById } from "../Controller/productsController.js"



const Route = express.Router()


Route.route('/').get(getAllProducts)

Route.route("/:id").get(getProductById)

export default Route
