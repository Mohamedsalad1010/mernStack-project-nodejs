import Task from "../models/tasks.js";

export const createTask = async(req , res , next) => {
    try {
        const task =  await Task.create({...req.body , createdBy: req.user._id})
        res.status(201).json(task)
    } catch (error) {
        next(error)
    }
}


// get tasks

export const getMyTasks = async (req , res , next) => {
    try {
        const tasks =await  Task.find({createdBy: req.user._id}).sort({createdAt: -1})
        res.json(tasks)
    } catch (error) {
        next(error)
    }
}

// update tasks

export const updateTask = async (req , res , next) => {
    try {
        const task = await Task.findOneAndUpdate(
            {_id: req.params.id , createdBy: req.user._id},
            req.body,
            {new: true}

        )
       
        if(!task) {
            return res.status(404).json('Not task found')
        }
       
        res.json(task)
    } catch (error) {
        next(error)
    }
}


// delete tasks
export const deleteTask = async (req , res , next) => {
    try {
        const deleteTask = await Task.findOneAndDelete({_id: req.params.id, createdBy: req.user._id})
        if(!deleteTask){
      return res.status(404).json('Not task found')
        }
        res.json('delete task')
    } catch (error) {
        next(error)
    }
}