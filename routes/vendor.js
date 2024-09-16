import express from 'express'
const router = express.Router();
import { add, update, deletevendor, getSingle, getByUserId, getAll, addMember, getMembers, addCompany, getCompany, addBank, getBank, getUniqueDelaNUmber, addSalesCompany, getSalesCompany } from '../controllers/vendor.js';
import { isAuthenticate,isCheckRole } from '../middlewears/auth.js';
import { getAllByStatus } from '../controllers/vendor.js';
import multer from 'multer'
import fs from 'fs'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      let folderName = 'public/uploads/'; // Default folder
  
      // Set the folder name based on the file field name
      switch (file.fieldname) {
        case 'backoffice':
          folderName += 'backoffice';
          break;
        case 'freight':
          folderName += 'freight';
          break;
        case 'sales':
          folderName += 'sales';
          break;
        case 'profit':
          folderName += 'profit';
          break;
        case 'warehouse':
          folderName += 'warehouse';
          break;
        case 'copyorder':
          folderName += 'copyorder';
          break;
        default:
          folderName += 'others'; // Fallback folder for any other files
      }
  
      // Ensure the folder exists, or create it
      fs.mkdirSync(folderName, { recursive: true });
  
      cb(null, folderName);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`); // Keep the original file name
    },
});

const uploader = multer({ storage });

router.route('/add').post(isAuthenticate,uploader.fields([
    { name: 'mdseAttach', maxCount: 1 },
    { name: 'mdseShipFile', maxCount: 1 },
    { name: 'mdseRecieveFile', maxCount: 1 },

    { name: 'freightAttach', maxCount: 1 },
    { name: 'freightShipFile', maxCount: 1 },
    { name: 'freightRecieveFile', maxCount: 1 },


    { name: 'freight2Attach', maxCount: 1 },
    { name: 'freight2ShipFile', maxCount: 1 },
    { name: 'freight2RecieveFile', maxCount: 1 },


    { name: 'warehouseAttach', maxCount: 1 },
    { name: 'warehouseShipFile', maxCount: 1 },
    { name: 'warehouseRecieveFile', maxCount: 1 },

    { name: 'serviceChargeAttach', maxCount: 1 },
    { name: 'serviceChargeShipFile', maxCount: 1 },
    { name: 'serviceChargeRecieveFile', maxCount: 1 },

    { name: 'miscAttach', maxCount: 1 },
    { name: 'miscShipFile', maxCount: 1 },
    { name: 'miscRecieveFile', maxCount: 1 },

    { name: 'salesAttach', maxCount: 1 },
    { name: 'salesShipFile', maxCount: 1 },
    { name: 'salesRecieveFile', maxCount: 1 },

    { name: 'profitAttach', maxCount: 1 },
    { name: 'profitShipFile', maxCount: 1 },
    { name: 'profitRecieveFile', maxCount: 1 },


    { name: 'PRCAttach', maxCount: 1 },
    { name: 'PRCShipFile', maxCount: 1 },
    { name: 'PRCRecieveFile', maxCount: 1 },
  ]), add); 


router.route('/update/:id').put(isAuthenticate,uploader.fields([
  { name: 'mdseAttach', maxCount: 1 },
  { name: 'mdseShipFile', maxCount: 1 },
  { name: 'mdseRecieveFile', maxCount: 1 },

  { name: 'freightAttach', maxCount: 1 },
  { name: 'freightShipFile', maxCount: 1 },
  { name: 'freightRecieveFile', maxCount: 1 },


  { name: 'freight2Attach', maxCount: 1 },
  { name: 'freight2ShipFile', maxCount: 1 },
  { name: 'freight2RecieveFile', maxCount: 1 },


  { name: 'warehouseAttach', maxCount: 1 },
  { name: 'warehouseShipFile', maxCount: 1 },
  { name: 'warehouseRecieveFile', maxCount: 1 },

  { name: 'serviceChargeAttach', maxCount: 1 },
  { name: 'serviceChargeShipFile', maxCount: 1 },
  { name: 'serviceChargeRecieveFile', maxCount: 1 },

  { name: 'miscAttach', maxCount: 1 },
  { name: 'miscShipFile', maxCount: 1 },
  { name: 'miscRecieveFile', maxCount: 1 },

  { name: 'salesAttach', maxCount: 1 },
  { name: 'salesShipFile', maxCount: 1 },
  { name: 'salesRecieveFile', maxCount: 1 },

  { name: 'profitAttach', maxCount: 1 },
  { name: 'profitShipFile', maxCount: 1 },
  { name: 'profitRecieveFile', maxCount: 1 },


  { name: 'PRCAttach', maxCount: 1 },
  { name: 'PRCShipFile', maxCount: 1 },
  { name: 'PRCRecieveFile', maxCount: 1 },
  ]), update);
// Route to delete a vendor
router.route('/delete/:id').delete(isAuthenticate, isCheckRole('admin'), deletevendor); 

// Route to get a single vendor by ID
router.route('/get/:id').get(isAuthenticate, getSingle);

// Route to get vendors by user ID
router.route('/get-by-user/').get(isAuthenticate, getByUserId);

// Route to get all vendors
router.route('/all').get( isAuthenticate, isCheckRole('admin'), getAll);
router.route('/all-by-status').get( isAuthenticate, isCheckRole('admin'), getAllByStatus);
router.route('/add-member').post( isAuthenticate, addMember);
router.route('/get-member').get( isAuthenticate, getMembers);
router.route('/add-company').post( isAuthenticate, addCompany);
router.route('/get-company').get( isAuthenticate, getCompany);
router.route('/add-sales-company').post( isAuthenticate, addSalesCompany);
router.route('/get-sales-company').get( isAuthenticate, getSalesCompany);


router.route('/add-bank').post( isAuthenticate, addBank);
router.route('/get-bank').get( isAuthenticate, getBank);
router.route('/get-id').get( getUniqueDelaNUmber);

export default router;