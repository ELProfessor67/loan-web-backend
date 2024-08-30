import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
import userRoutes from './routes/users.js'
import vendorRoutes from './routes/vendor.js'
import path from 'path'
import connectDB from './config/connectDB.js';
const __dirname = path.resolve();


dotenv.config({
    path: path.join(__dirname,'./config/.env')
})

connectDB();
const app = express();
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use('/public',express.static(path.join(__dirname,'./public')));


const prefix = "/api/v1"
app.use(prefix,userRoutes);
app.use(prefix+'/vendor',vendorRoutes);


app.get('/',(req,res) => {
    res.send('Everything is fine.')
})




export default app;