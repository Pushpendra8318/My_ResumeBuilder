import express from 'express'
import { uploadResumeImages } from '../controllers/uploadImages.js'
import { createResume, deleteResume, getResumeById, getUserResume, updateResume } from '../controllers/resumeController.js'
import { protect } from '../middleware/authMiddleware.js'


const resumeRouter=express.Router()

resumeRouter.post('/',protect ,createResume)
resumeRouter.get('/',protect ,getUserResume)
resumeRouter.get('/:id',protect ,getResumeById)
resumeRouter.put('/:id',protect,updateResume)
resumeRouter.put('/:id/upload-images',protect ,uploadResumeImages )
resumeRouter.delete('/:id',protect ,deleteResume)
export default  resumeRouter;
