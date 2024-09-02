import express from 'express'
const router = express.Router();
import { add, update, deletevendor, getSingle, getByUserId, getAll, addMember, getMembers } from '../controllers/vendor.js';
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
    { name: 'backoffice', maxCount: 1 },
    { name: 'freight', maxCount: 1 },
    { name: 'sales', maxCount: 1 },
    { name: 'profit', maxCount: 1 },
    { name: 'warehouse', maxCount: 1 },
  ]), add); 


router.route('/update/:id').put(isAuthenticate,uploader.fields([
    { name: 'backoffice', maxCount: 1 },
    { name: 'freight', maxCount: 1 },
    { name: 'sales', maxCount: 1 },
    { name: 'profit', maxCount: 1 },
    { name: 'warehouse', maxCount: 1 },
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

export default router;