import catchAsyncError from '../middlewears/catchAsyncError.js';
import UserModel from '../models/user.js';
import sendEmail from '../utils/sendMail.js';
import crypto from 'crypto'

export const register = catchAsyncError(async (req, res) => {
	const {name, email, password,address,state,city,phone} = req.body;
	
	const isExist = await UserModel.findOne({email});
	if(isExist) {
        res.status(409).json({
            success: false,
            message: 'User already exist'
        })
        return
    } 
	if(!name || !email || !password || !address || !city || !state || !phone){
		res.status(404).json({
            success: false,
            message: 'All fields are required'
        })
        return
	}


	const user = await UserModel.create({
		name, email, password,address,state,city,phone
	});
	await user.sendOTP();
	res.status(200).json({
		success: true,
		message: "OTP send to your email"
	})
	
});


export const login = catchAsyncError(async (req, res, next) => {

	const {email, password} = req.body;
	if(!email || !password){
        res.status(404).json({
            success: false,
            message: 'All fields are required'
        })
        return
    }
	let user = await UserModel.findOne({email});
    
	if (!user){
        res.status(401).json({
            success: false,
            message: 'Incorrect Email or Password'
        })
        return
    }

	const isMatch = await user.comparePassword(password);
   
    if (!isMatch){
        res.status(401).json({
            success: false,
            message: 'Incorrect Email or Password'
        })
        return
    }
	
	await user.sendOTP();
	res.status(200).json({
		success: true,
		message: "OTP send to your email"
	})
   
});


export const checkOTP = catchAsyncError(async (req, res, next) => {

	const {OTP} = req.body;
	

	const user = await UserModel.findOne({OTP,OTPExpire: {$gt: Date.now()}});


	if (!user){
        res.status(401).json({
            success: false,
            message: 'OTP is invalid or has been expired'
        })
        return
    }
  
    user.OTP = undefined;
    user.OTPExpire = undefined;
    await user.save();
    const token = user.getJWTToken();
	const option = {
        expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)
    }
    res.cookie('token',token,option).status(201).json({
        success: true,
        message:  `Welcome Back, ${user.name}.`,
        user
    })
});

export const loadme = catchAsyncError(async (req, res, next) => {

	res.status(200).json({
		success: true,
		user: req.user
	})
});

export const logout = catchAsyncError(async (req, res, next) => {
	res.clearCookie('token').status(200).json({
		success: true,
		message: 'Logout successfully'
	})
});

export const updateUser = catchAsyncError(async (req, res, next) => {
	const {name, email,address,city,state,phone,adminServiceCharge, adminServiceCharge2,miniumRevenue,miniumRevenueAmout,escrowAmout,assumedProfit} = req.body;
	

	const user = await UserModel.findByIdAndUpdate(req.user._id,{name, email,address,city,state,phone,adminServiceCharge, adminServiceCharge2, miniumRevenue,miniumRevenueAmout,escrowAmout,assumedProfit});
	
	res.status(200).json({
		success: true,
		message: "Update Successfully"
	})
});

export const changePassword = catchAsyncError(async (req, res, next) => {
	const {oldpassword, newpassword} = req.body;
	const user = await UserModel.findById(req.user._id);
	
	const isMatch = await user.comparePassword(oldpassword);
    if (!isMatch){
        res.status(401).json({
            success: false,
            message: 'Incorrect old password'
        })
        return
    }
	
	user.password = newpassword;
	await user.save();
    res.status(200).json({
		success: true,
		message: "Password update successfully"
	})
});


// forgot password 
export const forgotPassword = catchAsyncError(async (req, res, next) => {
    const { email } = req.body;
    // console.log(email)

    const user = await UserModel.findOne({ email });

    if (!user){
        res.status(401).json({
            success: false,
            message: 'User Not Exist'
        })
        return
    }

    const resetToken = await user.getResetToken();

    await user.save();

    const url = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

    const message = `Click on the link to reset your password. ${url}. If you have not request then please ignore.`;
    // Send token via email
    await sendEmail(user.email, "HG Streaming Reset Password", message);
	console.log(url);
	res.status(200).json({
        success: true,
        message: `Reset Token has been sent to ${user.email}`
    })
        
  });

// reset password 
export const resetPassword = catchAsyncError(async (req, res, next) => {
    const { token } = req.params;
  
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");
  
    const user = await UserModel.findOne({
      resetPasswordToken,
      resetPasswordExpire: {
        $gt: Date.now(),
      },
    });
  
    if (!user){
        res.status(401).json({
            success: false,
            message: 'Invalid Token or Maybe Expire'
        })
        return
    }
  
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
  
    await user.save();
	res.status(200).json({
        success: true,
        message: `Password Reset Successfully`
    })
  });



// reset password 
export const getSericeCharge = catchAsyncError(async (req, res, next) => {
    const user = await UserModel.findOne({role: 'admin'});
    const adminServiceCharge = user.adminServiceCharge;
    const adminServiceCharge2 = user.adminServiceCharge2;
    const miniumRevenue = user.miniumRevenue;
    const miniumRevenueAmout = user.miniumRevenueAmout;
    const escrowAmout = user.escrowAmout;
    const assumedProfit = user.assumedProfit;

	res.status(200).json({
        success: true,
        serviceCharge: adminServiceCharge || 5,
        serviceCharge2: adminServiceCharge2 || 2,
        miniumRevenue,
        miniumRevenueAmout,
        escrowAmout,
        assumedProfit
    })
  });



export const sendEmailData = catchAsyncError(async (req, res, next) => {
    const {email, subject, message,name} = req.body;
    const messageData = `Name: ${name}\n Email: ${email}\n Message: ${message}`;
    await sendEmail(process.env.ADMIN_EMAIL, subject, messageData);
    res.status(200).json({
        success: true,
        message: 'Email sent successfully'
    })
  });

