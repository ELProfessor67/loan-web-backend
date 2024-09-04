import mongoose  from "mongoose";
import userModel from "./user.js";


const vendorSchema = new mongoose.Schema({
    name: {type: String,required: true},
    email: {type: String,required: true},
    address: {type: String,required: true},
    city: {type: String,required: true},
    state: {type: String,required: true},
    phone: {type: String,required: true},
    status: {type: String, enum: ['pending','reject','complete']},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: userModel},
    amount: {type: Number,required: true},
    backoffice: {
        amount: {type: Number,required: true},
        file: {type: String,required: false},
    },
    freight: {
        amount: {type: Number,required: true},
        pallets: {type: Number,required: true},
        file: {type: String,required: false},
        companyName: {type: String}
    },
    sales: {
        amount: {type: Number,required: true},
        file: {type: String,required: false},
        companyName: {type: String},
        companyAddress: {type: String},
    },
    profit: {
        amount: {type: Number,required: true},
        file: {type: String,required: false},
    },
    warehouse: {
        amount: {type: Number,required: true},
        file: {type: String,required: false},
    },
    message: {type: String,default: undefined}
},{timestamps: true});




const vendorModel = mongoose.model('vendor',vendorSchema);
export default vendorModel;