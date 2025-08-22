import express from 'express'
import cors from 'cors'
import { connectdb } from './config/db.js';
import userRouter from './routes/userRouter.js';
import path from 'path'
import { fileURLToPath } from 'url';
import resumeRouter from './routes/resumeRoutes.js';
import dotenv from "dotenv"
dotenv.config()
 

const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename)
const app=express();

app.use(cors({
  origin: [
    "http://localhost:5174",
    "https://my-resume-builder-phi.vercel.app"
  ],
  credentials: true,
}));
//connect db
connectdb()
app.use(express.json());
app.use('/api/auth',userRouter);
app.use('/api/resume',resumeRouter)
app.use('/uploads',express.static(path.join(__dirname,'uploads')))
//Routes
app.get('/',(req,res)=>(
    res.send('API WORKING')
))
const PORT = process.env.PORT || 4000;
app.listen(PORT,()=>{
    console.log(`server is on port:${PORT}`);
})
