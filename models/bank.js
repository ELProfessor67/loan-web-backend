import mongoose  from "mongoose";




const bankSchema = new mongoose.Schema({
    holderName: {type: String,required: true},
    accountNumber: {type: String,required: true},
    routingNumber: {type: String,required: true},
    bankName: {type: String,required: true},
    accountType: {type: String,required: true},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'user'}
},{timestamps: true});




const bankModel = mongoose.model('bank',bankSchema);
export default bankModel;