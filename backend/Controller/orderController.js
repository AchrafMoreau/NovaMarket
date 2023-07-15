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
        itemsPrice,
    } = req.body

    if(cartItems && cartItems.length === 0){
        res.status(400)
        throw new Error("Empty Cart")
        
    }else{
        const order = await new Order({
            user:req.user._id,
            NETpriceItem: itemsPrice,
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

const updateOrderToPaid = asyncHandler( async(req, res)=>{
    const order = await Order.findById(req.params.id)

    if(order){
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }

        const updateOrder = await order.save()
        res.status(200).json(updateOrder)
    }else{
        res.status(400)
        throw new Error("Oder Not Found")
    }
})

const updateOrderToDelivered = asyncHandler( async(req, res)=>{
    const order = await Order.findById(req.params.id)

    if(order){
        order.deliverdAt = Date.now()
        order.isDeliverd = true

        const updateOrder = await order.save()
        res.status(200).json(updateOrder)
    }else{
        res.status(400)
        throw new Error("Order Not Found...!")
    }
})

const getAllUserOrder = asyncHandler( async(req, res)=>{
    const orders = await Order.find({user: req.user._id})
    if(orders){
        res.status(200).json(orders)
    }else{
        res.status(400)
        throw new Error("User Was Not Found")
    }
})

const orderList = asyncHandler( async(req, res)=>{
    const orders = await Order.find({}).populate("user", 'id name')
    if(orders){
        res.status(200).json(orders)
    }else{
        res.status(400)
        throw new Error("User Was Not Found")
    }
})
export {
    addOrderItems,
    getAllOrder,
    updateOrderToPaid,
    updateOrderToDelivered,
    getAllUserOrder,
    orderList,
}