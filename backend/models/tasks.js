import mongoose from "mongoose";
import { required } from "zod/mini";


const taskSchema = new mongoose.Schema({
 title: { type: String, required: true },
  description: String,
  status: {
    type: String,
    enum: ['pending', 'progress', 'completed'],
     default: 'pending'
  },
  dateDue: Date,
   createdBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
   }
} , {timestamps: true})

 
const Task = mongoose.model('task', taskSchema)

export default  Task