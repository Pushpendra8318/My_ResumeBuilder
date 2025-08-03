import express from 'express'
import {getUserProfile, loginUser, ragisterUser} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
const userRouter=express.Router();
userRouter.post('/ragister',ragisterUser)
userRouter.post('/login',loginUser)
//protected route as token will be required
userRouter.get('/profile',protect,getUserProfile)
export default userRouter
