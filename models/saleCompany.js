import mongoose  from "mongoose";
import userModel from "./user.js";




const companySchema = new mongoose.Schema({
    name: {type: String,required: true}, 
    address: {type: String,required: true},
    phone: {type: String, default: undefined},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
},{timestamps: true});




const salesCompanyModel = mongoose.model('salecompany',companySchema);
export default salesCompanyModel;