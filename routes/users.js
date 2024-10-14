import express from 'express'
const router = express.Router();
import {login,register,checkOTP,changePassword,forgotPassword,resetPassword,updateUser,loadme,logout, getSericeCharge,sendEmailData} from '../controllers/user.js'
import { isAuthenticate } from '../middlewears/auth.js';

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/me').get(isAuthenticate,loadme);
router.route('/logout').get(logout);
router.route('/user/update').put(isAuthenticate,updateUser);
router.route('/user/change-password').put(isAuthenticate,changePassword);
router.route('/forgot-password').post(forgotPassword);
router.route('/reset-password/:token').put(resetPassword);
router.route('/verify-otp').post(checkOTP);
router.route('/service-charge').get(getSericeCharge);

//send email
router.route('/send-email').post(sendEmailData);


export default router;