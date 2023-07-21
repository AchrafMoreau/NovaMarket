import asyncHandler from 'express-async-handler';
import Product from "../Models/productModel.js";



const getAllProducts = asyncHandler( async(req, res)=>{
    const allproduct = await Product.find({}).sort({createdAt: "desc"})
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
const deleteProduct = asyncHandler(async(req, res)=>{
    const product = await Product.findById(req.params.id)

    if(product){
        await product.deleteOne()
        res.status(200).json({message: "Product Was Removed"})
    }else{
        res.status(400)
        throw new Error("Product Was Not Found...")
    }
})

const createProduct = asyncHandler(async(req, res)=>{
    const product = new Product({
        name: "Sample name",
        user: req.user._id,
        image: '/images/sample.jpg',
        description:
            "Sample Description",
        brand: 'Sample Brand',
        category: 'Sample Category',
        price: 0,
        countInStock: 0,
    })
    
    const created = await product.save()
    if(created){
        res.status(200).json(created)

    }
})
const updateProduct = asyncHandler(async(req, res)=>{
    const {name, description, price, countInStock, brand, category, image} = req.body

    const product = await Product.findById(req.params.id)
    if(product){    
        product.name = name
        product.description = description
        product.price = price 
        product.countInStock = countInStock
        product.brand = brand
        product.category = category
        product.image = image

        const updateProduct = await product.save()
        if(updateProduct){
            res.status(200).json(updateProduct)
        }else{
            res.status(400)
            throw new Error("No Product Was Found....")
           
        }

    }
})

const createProductReview = asyncHandler(async(req, res)=>{
    const {comment, rating} = req.body

    console.log(comment, rating)

    const product = await Product.findById(req.params.id)

    if(product){
        const alreadyExist = product.reviews.find(elm => elm.user.toString() === req.user._id.toString())

        if(alreadyExist){
            res.status(400)
            throw new Error("Product already reviewed")
        }
        console.log('we good')
        const Review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }

        product.reviews.push(Review)
        product.numReviews = product.reviews.length
        product.rating = product.reviews.reduce((acc, curr)=> curr.rating + acc, 0) / product.reviews.length

        await product.save()
        res.status(200).json("Review added")
    }else{
        res.status(400)
        throw new Error("No Product Was Found....")
    }
})
export {
    getAllProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReview,
}
