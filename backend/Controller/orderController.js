import asyncHandler from "express-async-handler"
import Order from '../Models/orderModel.js'

const addOrderItems = asyncHandler( async(req, res)=>{

    const {
        shippingPrice,
        tax,
        total,
        cartItems,
        shippingAddress,
        paymentMethod,
    } = req.body

    if(cartItems && cartItems.length === 0){
        res.status(400)
        throw new Error("Empty Cart")
        
    }else{
        const order = await new Order({
            user:req.user._id,
            shippingPrice: shippingPrice,
            taxPrice: tax,
            totalPrice: total,
            orderItem: cartItems,
            shippingAddress: shippingAddress,
            paymentMethod: paymentMethod,
        })

        const creatOrder = await order.save()
        res.status(200).json(creatOrder)
        
    }
})

const getAllOrder = asyncHandler( async(req, res)=>{
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if(order){
        res.status(200).json(order)
    }else{
        res.status(400)
        throw new Error("No Order Was Found")
    }
})

export {
    addOrderItems,
    getAllOrder
}