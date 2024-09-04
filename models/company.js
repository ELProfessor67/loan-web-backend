import mongoose  from "mongoose";
import userModel from "./user.js";




const companySchema = new mongoose.Schema({
    name: {type: String,required: true},
    address: {type: String,required: true},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'user'}
},{timestamps: true});




const companyModel = mongoose.model('company',companySchema);
export default companyModel;