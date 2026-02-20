import express from 'express'
import { protectedRouter } from '../controllers/auth.js'
import { upload } from '../middlewares/upload.js'
import { fileUpload } from '../controllers/uploadController.js'

const router = express.Router()

router.post('/profile_image', protectedRouter , upload.single('file') , fileUpload)

export default router