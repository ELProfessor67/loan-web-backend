import jwt from "jsonwebtoken";
import UserModel from '../models/user.js'; 

export const isAuthenticate = async (req,res,next) => {
    try{
        const token = req.cookies.token;

        if(!token) throw new Error('Unauthorize user');
        const decodeToken = jwt.verify(token,process.env.JWT_SECRET);
        const user = await UserModel.findById(decodeToken._id);
        
        if(!user) throw new Error('Unauthorize user');
       
        req.user = user;

        next()
       

    }catch(err){
    
        res.status(err.statusCode || 501).json({
            success: false,
            message: err.message
        })
    }
}


export const isCheckRole = (role) => async (req,res,next) => {
    try{
        if(req.user.role != role){
            throw new Error(`Only ${role} can do this opretion`);
        }

        next()
       

    }catch(err){
    
        res.status(err.statusCode || 501).json({
            success: false,
            message: err.message
        })
    }
}