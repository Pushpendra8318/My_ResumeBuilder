import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connectdb } from './config/db.js';
import userRouter from './routes/userRouter.js';
import path from 'path'
import { fileURLToPath } from 'url';
import resumeRouter from './routes/ResumeRoutes.js';
 

const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename)
const app=express();
const PORT=4000;
app.use(cors());
//connect db
connectdb()
app.use(express.json());
app.use('/api/auth',userRouter);
app.use('/api/resume',resumeRouter)
app.use('/uploads',express.static(path.join(__dirname,'uploads'),{
    setHeader:(res,_path)=>{
        res.set('Access-control-Allow-Origin','http://localhost:5174')
    }
}))
//Routes
app.get('/',(req,res)=>(
    res.send('API WORKING')
))
app.listen(PORT,()=>{
    console.log(`server is on http://localhost:${PORT}`);
})
