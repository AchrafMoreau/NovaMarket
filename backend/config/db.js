import mongodb from "mongoose"

const dbConnection = async ()=>{
    try{
        const conix = await mongodb.connect(process.env.MONGO_CONIX)

        console.log(`we connected to the host ${conix.connection.host}`);
    }catch(err){
        console.log(`something wrong: ${err.message}`);
        process.exit(1)
    }
}

export default dbConnection