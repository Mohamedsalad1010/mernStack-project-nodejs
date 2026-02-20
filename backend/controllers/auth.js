import User from '../models/users.js'
import { jwtToken } from '../utils/generatorToken.js'
import jwt from 'jsonwebtoken'
// regester user real crud
export const regesterUser = async (req , res , next) => {
    let {name , email , password , role , profile} = req.body
    try {
        email = email.toLowerCase()
        const existUser = await User.findOne({email})
        if(existUser) return res.status(400).json('this email already in use')
            const user = await User.create({name , email , password , role , profile})
          const token = jwtToken(user._id)
          // remove password
const userWithoutPassword = user.toObject()
delete userWithoutPassword.password
          res.status(201).json({token , userWithoutPassword})
    } catch (error) {
        console.log('error', error)
        next(error)
    }
}


// log in 

export const logIn = async (req, res , next) => {
    let {email , password} = req.body;
    try {
      email = email?.toLowerCase()
        const  user = await User.findOne({email})
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json("invalid email or password")
        }
        const token = jwtToken(user._id)
        res.json({token})
    } catch (error) {
        next(error)
    }
}

export const protectedRouter = async (req , res , next) => {
    const token = req.headers.authorization?.split(" ")[1]
   if(!token) return res.status(401).json({message: 'not token provided.'})

    // validated toking or checking 
   try {
     const decode = jwt.verify(token , process.env.JWT_SECRET)
    console.log('decode', decode)
    req.user = await User.findById(decode.id).select('-password ')
    next()
   } catch (error) {
    res.status(401).json({message: 'invalid  or expired token'})
   }
}