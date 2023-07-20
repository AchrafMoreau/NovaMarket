import mongodb from "mongoose";



const ReviewSchema = mongodb.Schema({
    name:{type: String, required:true},
    rating:{type: Number, required:true},
    comment:{type: String, required:true},
    user:{
        type: mongodb.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
},{timestamps: true})


const ProductSchema = mongodb.Schema({
    user:{
        type: mongodb.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name:{
        type: String,
        required: true
    },
    brand:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    reviews: [ReviewSchema],
    rating:{
        type: Number,
        required: true,
        default: 0
    },
    numReviews:{
        type: Number,
        required: true,
        default: 0
    },
    price:{
        type: Number,
        required: true,
        default: 0
    },
    countInStock:{
        type: Number,
        required: true,
        default: 0
    }
},{
    timestamps: true
})

const Product = mongodb.model("Product", ProductSchema)
export default Product