import mongoose from "mongoose";
import userModel from "./user.js";
import { verify } from "crypto";


const vendorSchema = new mongoose.Schema({
    status: { type: String, enum: ['pending', 'reject', 'complete'] },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: userModel },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'company' },
    message: { type: String, default: undefined },
    dealId: { type: String, default: undefined },

    mdse: {
        vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'member', default: undefined, required: false },
        POnumber: { type: String, default: undefined },
        amount: { type: String, default: undefined },
        attach: { type: String, default: undefined },
        sign: { type: String, default: undefined },
        ship: {
            date: { type: String, default: undefined },
            file: { type: String, default: undefined }
        },
        recieve:
        {
            date: { type: String, default: undefined },
            file: { type: String, default: undefined }
        },
        tracking: {
            link: { type: String, default: undefined },
            number: { type: String, default: undefined }
        },
        verified: {type: Boolean, default: false},
        message: {type: String, default: undefined},
        status: {type: String, default: 'Pending'},
    },
    freight: {
        vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'member', default: undefined, required: false },
        POnumber: { type: String, default: undefined },
        amount: { type: String, default: undefined },
        sign: { type: String, default: undefined },
        attach: { type: String, default: undefined },
        ship: {
            date: { type: String, default: undefined },
            file: { type: String, default: undefined }
        },
        recieve:
        {
            date: { type: String, default: undefined },
            file: { type: String, default: undefined }
        },
        tracking: {
            link: { type: String, default: undefined },
            number: { type: String, default: undefined }
        },
        verified: {type: Boolean, default: false},
        message: {type: String, default: undefined},
        status: {type: String, default: 'Pending'},
    },
    freight2: {
        vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'member', default: undefined, required: false },
        POnumber: { type: String, default: undefined },
        amount: { type: String, default: undefined },
        attach: { type: String, default: undefined },
        sign: { type: String, default: undefined },
        ship: {
            date: { type: String, default: undefined },
            file: { type: String, default: undefined }
        },
        recieve:
        {
            date: { type: String, default: undefined },
            file: { type: String, default: undefined }
        },
        tracking: {
            link: { type: String, default: undefined },
            number: { type: String, default: undefined }
        },
        verified: {type: Boolean, default: false},
        message: {type: String, default: undefined},
        status: {type: String, default: 'Pending'},
    },
    warehouse: {
        vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'member', default: undefined, required: false },
        POnumber: { type: String, default: undefined },
        amount: { type: String, default: undefined },
        attach: { type: String, default: undefined },
        sign: { type: String, default: undefined },
        ship: {
            date: { type: String, default: undefined },
            file: { type: String, default: undefined }
        },
        recieve:
        {
            date: { type: String, default: undefined },
            file: { type: String, default: undefined }
        },
        tracking: {
            link: { type: String, default: undefined },
            number: { type: String, default: undefined }
        },
        verified: {type: Boolean, default: false},
        message: {type: String, default: undefined},
        status: {type: String, default: 'Pending'},
    },
    serviceCharge: {
        vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'member', default: undefined, required: false },
        POnumber: { type: String, default: undefined },
        amount: { type: String, default: undefined },
        attach: { type: String, default: undefined },
        ship: {
            date: { type: String, default: undefined },
            file: { type: String, default: undefined }
        },
        recieve:
        {
            date: { type: String, default: undefined },
            file: { type: String, default: undefined }
        },
        tracking: {
            link: { type: String, default: undefined },
            number: { type: String, default: undefined }
        },
        verified: {type: Boolean, default: false},
        message: {type: String, default: undefined},
        status: {type: String, default: 'Pending'},
    },
    serviceCharge2: {
        vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'member', default: undefined, required: false },
        POnumber: { type: String, default: undefined },
        amount: { type: String, default: undefined },
        attach: { type: String, default: undefined },
        ship: {
            date: { type: String, default: undefined },
            file: { type: String, default: undefined }
        },
        recieve:
        {
            date: { type: String, default: undefined },
            file: { type: String, default: undefined }
        },
        tracking: {
            link: { type: String, default: undefined },
            number: { type: String, default: undefined }
        },
        verified: {type: Boolean, default: false},
        message: {type: String, default: undefined},
        status: {type: String, default: 'Pending'},
    },
    misc: {
        vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'member', default: undefined, required: false },
        POnumber: { type: String, default: undefined },
        amount: { type: String, default: undefined },
        attach: { type: String, default: undefined },
        name: { type: String, default: 'misc' },
        sign: { type: String, default: undefined },
        ship: {
            date: { type: String, default: undefined },
            file: { type: String, default: undefined }
        },
        recieve:
        {
            date: { type: String, default: undefined },
            file: { type: String, default: undefined }
        },
        tracking: {
            link: { type: String, default: undefined },
            number: { type: String, default: undefined }
        },
        verified: {type: Boolean, default: false},
        message: {type: String, default: undefined},
        status: {type: String, default: 'Pending'},
    },
    sales: {
        vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'salecompany' },
        POnumber: { type: String, default: undefined },
        amount: { type: String, default: undefined },
        attach: { type: String, default: undefined },
        sign: { type: String, default: undefined },
        ship: {
            date: { type: String, default: undefined },
            file: { type: String, default: undefined }
        },
        recieve:
        {
            date: { type: String, default: undefined },
            file: { type: String, default: undefined }
        },
        tracking: {
            link: { type: String, default: undefined },
            number: { type: String, default: undefined }
        },
        verified: {type: Boolean, default: false},
        message: {type: String, default: undefined},
        status: {type: String, default: 'pending'},
    },
    profit: {
        vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'member', default: undefined, required: false },
        POnumber: { type: String, default: undefined },
        amount: { type: String, default: undefined },
        attach: { type: String, default: undefined },
        ship: {
            date: { type: String, default: undefined },
            file: { type: String, default: undefined }
        },
        recieve:
        {
            date: { type: String, default: undefined },
            file: { type: String, default: undefined }
        },
        tracking: {
            link: { type: String, default: undefined },
            number: { type: String, default: undefined }
        },
        verified: {type: Boolean, default: false},
        message: {type: String, default: undefined},
        status: {type: String, default: 'Pending'},
    },
    PRC: {
        vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'member', default: undefined, required: false },
        POnumber: { type: String, default: undefined },
        amount: { type: String, default: undefined },
        attach: { type: String, default: undefined },
        ship: {
            date: { type: String, default: undefined },
            file: { type: String, default: undefined }
        },
        recieve:
        {
            date: { type: String, default: undefined },
            file: { type: String, default: undefined }
        },
        tracking: {
            link: { type: String, default: undefined },
            number: { type: String, default: undefined }
        },
        verified: {type: Boolean, default: false},
        message: {type: String, default: undefined},
    },


    PIE: {
        vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'member', default: undefined, required: false },
        POnumber: { type: String, default: undefined },
        amount: { type: String, default: undefined },
        attach: { type: String, default: undefined },
        ship: {
            date: { type: String, default: undefined },
            file: { type: String, default: undefined }
        },
        recieve:
        {
            date: { type: String, default: undefined },
            file: { type: String, default: undefined }
        },
        tracking: {
            link: { type: String, default: undefined },
            number: { type: String, default: undefined }
        },
        verified: {type: Boolean, default: false},
        message: {type: String, default: undefined},
    },

}, { timestamps: true });




const vendorModel = mongoose.model('vendor', vendorSchema);
export default vendorModel;