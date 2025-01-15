import catchAsyncError from '../middlewears/catchAsyncError.js';
import VendorModel from '../models/vendor.js';
import memberModel from '../models/member.js';
import companyModel from '../models/company.js';
import bankModel from '../models/bank.js';
import userModel from '../models/user.js';
import vendorModel from '../models/vendor.js';
import salesCompanyModel from '../models/saleCompany.js';

export const add = catchAsyncError(async (req, res) => {
    const {
      mdseVendor,mdsePOnumber,mdseAmount,mdseShipDate,mdseRecieveDate,mdseTrackingNumber,mdseTracking,

      freightVendor,freightPOnumber,freightAmount,freightShipDate,freightRecieveDate,freightTrackingNumber,freightTracking,

      freight2Vendor,freight2POnumber,freight2Amount,freight2ShipDate,freight2RecieveDate,freight2TrackingNumber,freight2Tracking,

      warehouseVendor,warehousePOnumber,warehouseAmount,warehouseShipDate,warehouseRecieveDate,warehouseTrackingNumber,warehouseTracking,

      
      serviceChargeVendor,serviceChargePOnumber,serviceChargeAmount,serviceChargeShipDate,serviceChargeRecieveDate,serviceChargeTrackingNumber,serviceChargeTracking,


      miscVendor,miscPOnumber,miscAmount,miscShipDate,miscRecieveDate,miscTrackingNumber,miscTracking,miscName,

      salesVendor,salesPOnumber,salesAmount,salesShipDate,salesRecieveDate,salesTrackingNumber,salesTracking,


      profitVendor,profitPOnumber,profitAmount,profitShipDate,profitRecieveDate,profitTrackingNumber,profitTracking,


      PRCVendor,PRCPOnumber,PRCAmount,PRCShipDate,PRCRecieveDate,PRCTrackingNumber,PRCTracking,

      dealId
       
    } = req.body;

   
  
    // Extract the file paths from the request
    const mdseAttach = req.files['mdseAttach'] ? req.files['mdseAttach'][0].path : null;
    const mdseShipFile = req.files['mdseShipFile'] ? req.files['mdseShipFile'][0].path : null;
    const mdseRecieveFile = req.files['mdseRecieveFile'] ? req.files['mdseRecieveFile'][0].path : null;

    const freightAttach = req.files['freightAttach'] ? req.files['freightAttach'][0].path : null;
    const freightShipFile = req.files['freightShipFile'] ? req.files['freightShipFile'][0].path : null;
    const freightRecieveFile = req.files['freightRecieveFile'] ? req.files['freightRecieveFile'][0].path : null;


    const freight2Attach = req.files['freight2Attach'] ? req.files['freight2Attach'][0].path : null;
    const freight2ShipFile = req.files['freight2ShipFile'] ? req.files['freight2ShipFile'][0].path : null;
    const freight2RecieveFile = req.files['freight2RecieveFile'] ? req.files['freight2RecieveFile'][0].path : null;


    const warehouseAttach = req.files['warehouseAttach'] ? req.files['warehouseAttach'][0].path : null;
    const warehouseShipFile = req.files['warehouseShipFile'] ? req.files['warehouseShipFile'][0].path : null;
    const warehouseRecieveFile = req.files['warehouseRecieveFile'] ? req.files['warehouseRecieveFile'][0].path : null;


    const serviceChargeAttach = req.files['serviceChargeAttach'] ? req.files['serviceChargeAttach'][0].path : null;
    const serviceChargeShipFile = req.files['serviceChargeShipFile'] ? req.files['serviceChargeShipFile'][0].path : null;
    const serviceChargeRecieveFile = req.files['serviceChargeRecieveFile'] ? req.files['serviceChargeRecieveFile'][0].path : null;



    const miscAttach = req.files['miscAttach'] ? req.files['miscAttach'][0].path : null;
    const miscShipFile = req.files['miscShipFile'] ? req.files['miscShipFile'][0].path : null;
    const miscRecieveFile = req.files['miscRecieveFile'] ? req.files['miscRecieveFile'][0].path : null;


    const salesAttach = req.files['salesAttach'] ? req.files['salesAttach'][0].path : null;
    const salesShipFile = req.files['salesShipFile'] ? req.files['salesShipFile'][0].path : null;
    const salesRecieveFile = req.files['salesRecieveFile'] ? req.files['salesRecieveFile'][0].path : null;


    const profitAttach = req.files['profitAttach'] ? req.files['profitAttach'][0].path : null;
    const profitShipFile = req.files['profitShipFile'] ? req.files['profitShipFile'][0].path : null;
    const profitRecieveFile = req.files['profitRecieveFile'] ? req.files['profitRecieveFile'][0].path : null;

    const PRCAttach = req.files['PRCAttach'] ? req.files['PRCAttach'][0].path : null;
    const PRCShipFile = req.files['PRCShipFile'] ? req.files['PRCShipFile'][0].path : null;
    const PRCRecieveFile = req.files['PRCRecieveFile'] ? req.files['PRCRecieveFile'][0].path : null;
    
  
    // Create a new vendor object
    console.log(req.user.company?._id,'company id')
    const newVendor = new VendorModel({
      dealId,
      company:  req.user.company?._id,
      owner: req.user._id,
      status: 'pending' ,

      mdse: {
        vendor: mdseVendor,
        POnumber: mdsePOnumber,
        amount: mdseAmount,
        attach: mdseAttach,
        ship: {
          date: mdseShipDate,
          file: mdseShipFile
        },
        recieve: {
          date: mdseRecieveDate,
          file: mdseRecieveFile
        },
        tracking: {
          link: mdseTracking,
          number: mdseTrackingNumber
        }
      },




      freight: {
        vendor: freightVendor || undefined,
        POnumber: freightPOnumber,
        amount: freightAmount,
        attach: freightAttach,
        ship: {
          date: freightShipDate,
          file: freightShipFile
        },
        recieve: {
          date: freightRecieveDate,
          file: freightRecieveFile
        },
        tracking: {
          link: freightTracking,
          number: freightTrackingNumber
        }
      },



      freight2: {
        vendor: freight2Vendor || undefined,
        POnumber: freight2POnumber,
        amount: freight2Amount,
        attach: freight2Attach,
        ship: {
          date: freight2ShipDate,
          file: freight2ShipFile
        },
        recieve: {
          date: freight2RecieveDate,
          file: freight2RecieveFile
        },
        tracking: {
          link: freight2Tracking,
          number: freight2TrackingNumber
        }
      },


      warehouse: {
        vendor: warehouseVendor || undefined,
        POnumber: warehousePOnumber,
        amount: warehouseAmount,
        attach: warehouseAttach,
        ship: {
          date: warehouseShipDate,
          file: warehouseShipFile
        },
        recieve: {
          date: warehouseRecieveDate,
          file: warehouseRecieveFile
        },
        tracking: {
          link: warehouseTracking,
          number: warehouseTrackingNumber
        }
      },

      serviceCharge: {
        vendor: serviceChargeVendor || undefined,
        POnumber: serviceChargePOnumber,
        amount: serviceChargeAmount,
        attach: serviceChargeAttach,
        ship: {
          date: serviceChargeShipDate,
          file: serviceChargeShipFile
        },
        recieve: {
          date: serviceChargeRecieveDate,
          file: serviceChargeRecieveFile
        },
        tracking: {
          link: serviceChargeTracking,
          number: serviceChargeTrackingNumber
        }
      },


      misc: {
        vendor: miscVendor || undefined,
        POnumber: miscPOnumber,
        amount: miscAmount,
        attach: miscAttach,
        name: miscName,
        ship: {
          date: miscShipDate,
          file: miscShipFile
        },
        recieve: {
          date: miscRecieveDate,
          file: miscRecieveFile
        },
        tracking: {
          link: miscTracking,
          number: miscTrackingNumber
        }
      },


      sales: {
        vendor: salesVendor || undefined,
        POnumber: salesPOnumber,
        amount: salesAmount,
        attach: salesAttach,
        ship: {
          date: salesShipDate,
          file: salesShipFile
        },
        recieve: {
          date: salesRecieveDate,
          file: salesRecieveFile
        },
        tracking: {
          link: salesTracking,
          number: salesTrackingNumber
        }
      },


      profit: {
        vendor: profitVendor || undefined,
        POnumber: profitPOnumber,
        amount: profitAmount,
        attach: profitAttach,
        ship: {
          date: profitShipDate,
          file: profitShipFile
        },
        recieve: {
          date: profitRecieveDate,
          file: profitRecieveFile
        },
        tracking: {
          link: profitTracking,
          number: profitTrackingNumber
        }
      },


      PRC: {
        vendor: PRCVendor || undefined,
        POnumber: PRCPOnumber,
        amount: PRCAmount,
        attach: PRCAttach,
        ship: {
          date: PRCShipDate,
          file: PRCShipFile
        },
        recieve: {
          date: PRCRecieveDate,
          file: PRCRecieveFile
        },
        tracking: {
          link: PRCTracking,
          number: PRCTrackingNumber
        }
      },

    });
  
    await newVendor.save();
  
    res.status(201).json({
      success: true,
      message: "Vendor added successfully",
      vendor: newVendor
    });
  });
  
  // Update a vendor
  export const update = catchAsyncError(async (req, res) => {
    const { id } = req.params;
    const {status,message } = req.body;

  
    // Find vendor by ID
    let vendor = await VendorModel.findById(id);
    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found"
      });
    }
  
    // Check if user role is admin or the status is reject
    if (req.user.role !== 'admin' && vendor.status !== 'reject') {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this vendor"
      });
    }
  

    vendor.status = status || vendor.status;
    vendor.message = message;
  
    await vendor.save();
  
    res.status(200).json({
      success: true,
      message: "Vendor updated successfully",
      vendor
    });
  });

// Delete a vendor
export const deletevendor = catchAsyncError(async (req, res) => {
  const { id } = req.params;

  // Find vendor by ID
  const vendor = await VendorModel.findById(id);
  if (!vendor) {
    return res.status(404).json({
      success: false,
      message: "Vendor not found"
    });
  }

  await vendor.remove();

  res.status(200).json({
    success: true,
    message: "Vendor deleted successfully"
  });
});

// Get a single vendor by ID
export const getSingle = catchAsyncError(async (req, res) => {
  const { id } = req.params;

  // Find vendor by ID
  const vendor = await VendorModel.findById(id).populate('owner').populate('company').populate('mdse.vendor').populate('freight.vendor').populate('freight2.vendor').populate('warehouse.vendor').populate('serviceCharge.vendor').populate('misc.vendor').populate('sales.vendor').populate('profit.vendor').populate('PRC.vendor');

  if (!vendor) {
    return res.status(404).json({
      success: false,
      message: "Vendor not found"
    });
  }

  res.status(200).json({
    success: true,
    vendor
  });
});

// Get vendors by user ID
export const getByUserId = catchAsyncError(async (req, res) => {
  const { _id } = req.user;
  // Find vendors by user ID
  const vendors = await VendorModel.find({ owner: _id });

  res.status(200).json({
    success: true,
    vendors
  });
});

// Get all vendors
export const getAll = catchAsyncError(async (req, res) => {
  let vendors;

  // If the user is admin, get all vendors
  if (req.user.role === 'admin') {
    vendors = await VendorModel.find();
  }

  res.status(200).json({
    success: true,
    vendors
  });
});


export const getAllByStatus = catchAsyncError(async (req, res) => {
    const status = req.query.status
    let vendors;
  
    // If the user is admin, get all vendors
    if (req.user.role === 'admin') {
      vendors = await VendorModel.find({status});
    }
  
    res.status(200).json({
      success: true,
      vendors
    });
  });

  export const addMember = catchAsyncError(async (req, res) => {
    const { name,contactName, email, address, city, state, phone, accountNumber, routingNumber, bankName, bankAddress } = req.body;
  
   
  
    // Create a new vendor object
    const newMember = new memberModel({
      name,
      email,
      contactName,
      address,
      city,
      state,
      phone,
      owner: req.user._id,
      accountNumber, routingNumber, bankName, bankAddress
    });
  
    await newMember.save();
  
    res.status(201).json({
      success: true,
      message: "Member added successfully",
      vendor: newMember
    });
  });



  export const getMembers = catchAsyncError(async (req, res) => {
    const members = await memberModel.find({owner: req.user._id})
  
    res.status(200).json({
      success: true,
      members
    });
  });





  export const addCompany = catchAsyncError(async (req, res) => {
    const { name,contactName, address, email, phone, accountNumber, routingNumber, bankName, bankAddress} = req.body;
  
   const company = await companyModel.findOne({owner: req.user._id});

   if(company){
    company.name = name || company.name;
    company.address = address || company.address;
    company.email = email || company.email;
    company.accountNumber = accountNumber || company.accountNumber;
    company.routingNumber = routingNumber || company.routingNumber;
    company.bankName = bankName || company.bankName;
    company.bankAddress = bankAddress || company.bankAddress;
    company.contactName = contactName || company.contactName;
    await company.save();
    await userModel.findByIdAndUpdate(req.user._id,{company: company._id});
   }else{
    // Create a new vendor object
    const newComany = new companyModel({
      name,
      contactName,
      address,
      owner: req.user._id,
      email, phone, accountNumber, routingNumber, bankName, bankAddress
    });
  
    await newComany.save();

    await userModel.findByIdAndUpdate(req.user._id,{company: newComany._id});
   }
  
    
  
    res.status(201).json({
      success: true,
      message: "Company updated successfully"
    });
  });



  export const getCompany = catchAsyncError(async (req, res) => {
    const companies = await companyModel.find({owner: req.user._id})
  
    res.status(200).json({
      success: true,
      companies
    });
  });




  export const addSalesCompany = catchAsyncError(async (req, res) => {
    const { name, address, phone} = req.body;
  
    const newComany = new salesCompanyModel({
      name,
      address,
      phone,
      owner: req.user._id,
    });
  
    await newComany.save();
   
  
    
  
    res.status(201).json({
      success: true,
      message: "Company add successfully"
    });
  });



  export const getSalesCompany = catchAsyncError(async (req, res) => {
    const companies = await salesCompanyModel.find({owner: req.user._id})
  
    res.status(200).json({
      success: true,
      companies
    });
  });



  // bank api 

  export const addBank = catchAsyncError(async (req, res) => {
    const { holderName, accountNumber, routingNumber, bankName, accountType} = req.body;
  
   
    if(!holderName || !accountNumber || !routingNumber || !bankName || !accountType){
      res.status(401).json({
        success: false,
        message: 'All fields are required true'
      })
      return
    }
    // Create a new vendor object
    const bank = await bankModel.findOne({owner: req.user._id});
    if(bank){
      bank.holderName = holderName || bank.holderName
      bank.accountNumber = accountNumber || bank.accountNumber
      bank.routingNumber = routingNumber || bank.routingNumber
      bank.bankName = bankName || bank.bankName
      bank.holderName = holderName || bank.holderName
      bank.accountType = accountType || bank.accountType


      await bank.save()
    }else{
      const newBank = new bankModel({
        holderName, accountNumber, routingNumber, bankName, accountType,
        owner: req.user._id,
      });
    
      await newBank.save();
  
      await userModel.findByIdAndUpdate(req.user._id,{bank: newBank._id})
    
      
    }


    res.status(201).json({
      success: true,
      message: "Bank added successfully",
      vendor: newBank
    });
  });


 



  export const getBank = catchAsyncError(async (req, res) => {
    const bank = await bankModel.find({owner: req.user._id})
  
    res.status(200).json({
      success: true,
      bank
    });
  });

  

export const getUniqueDelaNUmber = catchAsyncError(async (req, res) => {
  
  const number = await vendorModel.countDocuments();
  res.status(200).json({
    success: true,
    id: number+1
  });
});