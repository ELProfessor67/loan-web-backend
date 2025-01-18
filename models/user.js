import mongoose  from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import crypto from 'crypto';
import sendEmail from "../utils/sendMail.js";
import { type } from "os";


function generateOTP() {
	const otp = Math.floor(1000 + Math.random() * 9000);
	return otp.toString();
}


const userSchema = new mongoose.Schema({
    name: {type: String,required: true},
    email: {type: String,required: true},
    address: {type: String,required: true},
    city: {type: String,required: true},
    state: {type: String,required: true},
    phone: {type: String,required: true},
    OTP: {type: Number, default: undefined},
    OTPExpire: {type: Date, default: undefined},
    password: {type: String, required: true, selected: false},
	resetPasswordToken: {type: String, default: undefined},
	resetPasswordExpire: {type: String, default: undefined},
    role: {type: String, enum: ['user','admin'],default: 'user'},
	adminServiceCharge: {type: Number,required: false,default: undefined},
	adminServiceCharge2: {type: Number,required: false,default: undefined},
	bank: {type: mongoose.Schema.Types.ObjectId,ref: 'bank',default: undefined},
	company: {type: mongoose.Schema.Types.ObjectId, ref: 'company'}
},{timestamps: true});



userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	this.password =  await bcrypt.hash(this.password, 10);

	next();
  });
  
  userSchema.methods.getJWTToken = function () {
	return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
	  expiresIn: "15d",
	});
  };
  
  userSchema.methods.comparePassword = async function (password) {
	return await bcrypt.compare(password, this.password);
  };

  userSchema.methods.sendOTP = async function () {
	
	
	// Example usage:
	const otp = generateOTP();
	console.log("Generated OTP:", otp);
	this.OTP = otp;
	this.OTPExpire = Date.now() + 5 * 60 * 1000;
	await sendEmail(this.email, "HG Vibe Streaming OTP", otp)
	this.save();
	return otp;
  };
  
  userSchema.methods.getResetToken = function () {
	const resetToken = crypto.randomBytes(20).toString("hex");
  
	this.resetPasswordToken = crypto
	  .createHash("sha256")
	  .update(resetToken)
	  .digest("hex");
  
	this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  
	return resetToken;
  };



const userModel = mongoose.model('user',userSchema);
export default userModel;