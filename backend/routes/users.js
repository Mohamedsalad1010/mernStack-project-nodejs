import express from 'express'
import { createUser,  getUsers , getUserinfo, updateUser, deleteUser,  } from '../controllers/users.js'
const router = express.Router()

router.get('/', getUsers)
router.post('/', createUser)
router.get('/:id', getUserinfo)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)


export default router