import express from 'express'
import {  protectedRouter  } from '../controllers/auth.js'
import { authorize } from '../middlewares/authorize.js'
const router = express.Router()


router.get('/dashboard' ,  protectedRouter , authorize('admin'),  (req, res) => {
    res.json(`welcome to admin dashboard ${req.user}`)
})



export default router
