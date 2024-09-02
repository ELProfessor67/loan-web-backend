import catchAsyncError from '../middlewears/catchAsyncError.js';
import VendorModel from '../models/vendor.js';
import memberModel from '../models/member.js';

export const add = catchAsyncError(async (req, res) => {
    const { name, email, address, city, state, phone, amount, backofficeAmount, freightAmount,freightPallets, salesAmount, profitAmount, warehouseAmount } = req.body;
  
    // Extract the file paths from the request
    const backofficeFilePath = req.files['backoffice'] ? req.files['backoffice'][0].path : null;
    const freightFilePath = req.files['freight'] ? req.files['freight'][0].path : null;
    const salesFilePath = req.files['sales'] ? req.files['sales'][0].path : null;
    const profitFilePath = req.files['profit'] ? req.files['profit'][0].path : null;
    const warehouseFilePath = req.files['warehouse'] ? req.files['warehouse'][0].path : null;
  
    // Create a new vendor object
    const newVendor = new VendorModel({
      name,
      email,
      address,
      city,
      state,
      phone,
      amount,
      backoffice: {
        amount: backofficeAmount,
        file: backofficeFilePath
      },
      freight: {
        amount: freightAmount,
        file: freightFilePath,
        pallets: freightPallets
      },
      sales: {
        amount: salesAmount,
        file: salesFilePath
      },
      profit: {
        amount: profitAmount,
        file: profitFilePath
      },
      warehouse: {
        amount: warehouseAmount,
        file: warehouseFilePath
      },
      owner: req.user._id,
      status: 'pending' // Set initial status to 'pending'
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
    const { name, email, address, city, state, phone, amount, backofficeAmount, freightAmount, salesAmount, profitAmount, warehouseAmount, status,freightPallets,message } = req.body;
  
    // Extract the file paths from the request
    const backofficeFilePath = req.files['backoffice'] ? req.files['backoffice'][0].path : null;
    const freightFilePath = req.files['freight'] ? req.files['freight'][0].path : null;
    const salesFilePath = req.files['sales'] ? req.files['sales'][0].path : null;
    const profitFilePath = req.files['profit'] ? req.files['profit'][0].path : null;
    const warehouseFilePath = req.files['warehouse'] ? req.files['warehouse'][0].path : null;
  
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
  
    // Update vendor details
    vendor.name = name || vendor.name;
    vendor.email = email || vendor.email;
    vendor.address = address || vendor.address;
    vendor.city = city || vendor.city;
    vendor.state = state || vendor.state;
    vendor.phone = phone || vendor.phone;
    vendor.amount = amount || vendor.amount;
    vendor.backoffice = {
      amount: backofficeAmount || vendor.backoffice.amount,
      file: backofficeFilePath || vendor.backoffice.file
    };
    vendor.freight = {
      amount: freightAmount || vendor.freight.amount,
      file: freightFilePath || vendor.freight.file,
      pallets: freightPallets || vendor.freight.pallets
    };
    vendor.sales = {
      amount: salesAmount || vendor.sales.amount,
      file: salesFilePath || vendor.sales.file
    };
    vendor.profit = {
      amount: profitAmount || vendor.profit.amount,
      file: profitFilePath || vendor.profit.file
    };
    vendor.warehouse = {
      amount: warehouseAmount || vendor.warehouse.amount,
      file: warehouseFilePath || vendor.warehouse.file
    };
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
  const vendor = await VendorModel.findById(id).populate('owner');
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
    const { name, email, address, city, state, phone } = req.body;
  
   
  
    // Create a new vendor object
    const newMember = new memberModel({
      name,
      email,
      address,
      city,
      state,
      phone,
      owner: req.user._id,
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