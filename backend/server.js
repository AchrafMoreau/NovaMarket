import express from "express"
import path from 'path'
import dotenv from "dotenv"
import cors from "cors"
import dbConnection from "./config/db.js"
import ProducctRoute from "./router/productsRouter.js"
import { NotFound, errHandler } from "./middleWare/errorMiddleWare.js"
import UserRouter from "./router/userRouter.js"
import OrderRouter from "./router/orderRoutee.js"
import uploadRouter from './router/uploadRouter.js'

dotenv.config()
const app = express()


// middleWare
app.use(cors())
app.use(express.json())
app.use("/api/product", ProducctRoute)
app.use('/api/user', UserRouter)
app.use("/api/order", OrderRouter)
app.use('/api/upload', uploadRouter)


            

// making a folder accessible
const __dirname = path.resolve()
app.use("/upload",express.static(path.join(__dirname, '/upload')))

// app.use('/upload', express.static(path.join(__dirname, 'upload/')));
console.log(path.join(__dirname, '/upload'))

// Serve static files from the 'frontend' folder
app.use(express.static(path.join(__dirname, 'frontend')));
// get the paypal api clinet 
app.get("/api/config/paypal", (req,res)=> res.send(process.env.PAYPAL_API_CLIENT))
// error middleware
app.use(NotFound)
app.use(errHandler)

// db connection -moongodb-
dbConnection()






const Port = process.env.PORT || 3000
app.listen(Port, ()=>{console.log(`we are listing on the port ${Port} and we're in ${process.env.ENV_MODE} Mode ....`)})