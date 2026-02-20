import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { string } from "zod";

const userSchema =  new mongoose.Schema({
    name: String,
    email: {type: String , unique: true},
    password: String,
    role: {
        type: String,
        enum: ['user' ,'admin'],
        default: 'user'
    },
 profile: String
})

// make hashe brefor saving

userSchema.pre('save', async function(){
    // this passowrd is the same not make update 
    if(!this.isModified('password')  ) {
      
    }

        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password , salt)
     
})

// methods compare password
userSchema.methods.comparePassword = function(inputPassword){
    return bcrypt.compare(inputPassword , this.password)
}
const User = mongoose.model('User', userSchema)

export default User