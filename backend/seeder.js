import bcryptjs from "bcryptjs";
import users from "./data/user.js";
import User from "./Models/userModel.js";
import Product from "./Models/productModel.js";
import Order from "./Models/orderModel.js";
import dbConnection from "./config/db.js";
import dotenv from "dotenv";
import products from "./data/product.js";


dotenv.config()

dbConnection()


const InsertData = async()=>{
    try{
        await User.deleteMany()
        await Order.deleteMany()
        await Product.deleteMany()

        const createUsers = await User.insertMany(users)

        const adminUser = createUsers[0]._id

        const sampleProducts = products.map((preData)=>{
            return{
                ...preData,
                user: adminUser 
            }
        })

        await Product.insertMany(sampleProducts)
        console.log(`the instrting was all good ...`)
        process.exit()
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}

const DeleteData = async ()=>{
    try{
        await User.deleteMany()
        await Order.deleteMany()
        await Product.deleteMany()

        console.log(`deleting was all good...`)
        process.exit()
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}

if(process.argv[2] === "-d"){
    DeleteData()
}else{
    InsertData()
}