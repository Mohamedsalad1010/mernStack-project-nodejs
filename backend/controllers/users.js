import User from "../models/users.js"
import {jwtToken} from '../utils/generatorToken.js'

export const getUsers = async (req , res) => {
   
   try {
    const getAllUser = await  User.find().select('-password')
    if(!getAllUser) return res.status(404).json('not found user')
        res.json(getAllUser)
   } catch (error) {
    res.status(500).json('server error Accured')
   }
}


// great users 
export const createUser = async (req , res) => {
    const users =  await  User(req.body)
    const saved = await users.save()
    res.json(saved)
}

// get user info

export const getUserinfo = async (req ,res) => {
    const {id} = req.params
    try {
        const getUser = await User.findById(id)
        if(!getUser){
             return res.status(404).json('not found user')
        }
        res.json(getUser)
    } catch (error) {
        console.log('server error', error.message)
    }
}

// update user  
export const updateUser = async (req , res) => {
    const {id } = req.params
    try{
        const update = await User.findByIdAndUpdate(id , req.body, {new: true})
        if(!update){
             return res.status(404).json('not found user')
        }
        res.json(update)
    }
    catch(error){
  console.log('server error', error.message)
    }
}

// delete user 
export const deleteUser = async (req , res) => {
    const {id } = req.params
    const deleted = await User.findByIdAndDelete(id)
    if(!deleted){
         return res.status(404).json('not found user')
    }
    res.json(`user with id: ${id} was Deleted`)
}

