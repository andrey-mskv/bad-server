import { Router } from 'express'
import { uploadFile } from '../controllers/upload'
import fileMiddleware from '../middlewares/file'
import { checkFileSize } from '../middlewares/checkFileSize'
import { validateImage } from '../middlewares/validateImage'

const uploadRouter = Router()
uploadRouter.post('/', fileMiddleware.single('file'), checkFileSize, validateImage, uploadFile)

export default uploadRouter
