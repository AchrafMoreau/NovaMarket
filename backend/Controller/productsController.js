import asyncHandler from 'express-async-handler';
import Product from "../Models/productModel.js";


const getAllProducts = asyncHandler( async(req, res)=>{
    const allproduct = await Product.find({})
    res.json(allproduct)
})

const getProductById = asyncHandler( async(req, res)=>{
    const singlProduct = await Product.findById(req.params.id)

    if(singlProduct){
        res.status(200).json(singlProduct)
    }else{
        res.status(400)
        throw new Error("the product was not found...")
    }
})

export {
    getAllProducts,
    getProductById,
}
