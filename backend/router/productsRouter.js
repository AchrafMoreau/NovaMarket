import express from "express";
import { 
        createProduct, 
        createProductReview, 
        deleteProduct, 
        getAllProducts, 
        getProductById, 
        updateProduct } from "../Controller/productsController.js"
import { protect, usersAuthMiddleWare } from "../middleWare/authMiddleWare.js";



const Route = express.Router()


Route.route('/')
    .get(getAllProducts)
    .post(protect, usersAuthMiddleWare, createProduct)

Route.route("/:id")
    .get(getProductById)
    .delete(protect, usersAuthMiddleWare, deleteProduct)
    .put(protect, usersAuthMiddleWare, updateProduct)

Route.route("/:id/review")
    .post(protect, createProductReview)


export default Route
