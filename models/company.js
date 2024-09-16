import mongoose  from "mongoose";
import userModel from "./user.js";




const companySchema = new mongoose.Schema({
    name: {type: String,required: true},
    contactName: {type: String,default: ''},
    address: {type: String,required: true},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    email: {type: String, default: undefined},
    phone: {type: String, default: undefined},
    
    accountNumber: {type: String,required: false},
    routingNumber: {type: String,required: false},
    bankName: {type: String,required: false},
    bankAddress: {type: String,required: false},
},{timestamps: true});




const companyModel = mongoose.model('company',companySchema);
export default companyModel;