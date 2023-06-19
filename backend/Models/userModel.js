import mongodb from "mongoose";
import bycrypt from "bcryptjs"

const UserSchema = mongodb.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
})

UserSchema.methods.matchPassword = async function(enteredPassword){
    return await bycrypt.compare(enteredPassword, this.password)
}

UserSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next()
    }
    
    const salt = await bycrypt.genSalt(10)
    this.password = await bycrypt.hash(this.password, salt)
})
const User = mongodb.model("User", UserSchema)
export default User