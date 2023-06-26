import mongodb from "mongoose";






const OrderSchema = mongodb.Schema({
    user:{
        type: mongodb.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    orderItem: [
        {
          name: { type: String, required: true },
          qty: { type: Number, required: true },
          image: { type: String, required: true },
          price: { type: Number, required: true },
          product: {
            type: mongodb.Schema.Types.ObjectId,
            required: true,
            ref: "Product"
          }
        }
    ],
    shippingAddress:{
        address:{type: String, required: true},
        city:{type: String, required: true},
        ZIP:{type: String, required: true},
        country:{type: String, required: true},
    },
    paymentMethod:{
        type: String,
        required: true
    },
    
    
    isPaid:{
        type: Boolean,
        default: false
    },
    
    taxPrice:{
        type: Number,
        required: true,
        default: 0.0
    },
    shippingPrice:{
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice:{
        type: Number,
        required: true,
        default: 0.0
    },
    paidAt:{
        type: Date,
    },
    isDeliverd:{
        type: Boolean,
        default: false,
    },
    deliverdAt:{
        type: Date
    }
},{
    timestamps: true
})

const Order = mongodb.model("Order", OrderSchema)
export default Order