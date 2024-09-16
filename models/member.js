import mongoose  from "mongoose";
import userModel from "./user.js";




const memberSchema = new mongoose.Schema({
    name: {type: String,required: true},
    contactName: {type: String,default: ''},
    email: {type: String,required: true},
    address: {type: String,required: true},
    city: {type: String,required: true},
    state: {type: String,required: true},
    phone: {type: String,required: true},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    accountNumber: {type: String,required: false},
    routingNumber: {type: String,required: false},
    bankName: {type: String,required: false},
    bankAddress: {type: String,required: false},
},{timestamps: true});




const memberModel = mongoose.model('member',memberSchema);
export default memberModel;