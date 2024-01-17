// router.js
import express from 'express';
import { authUser, getUserProfile, logoutUser, registerUser, updateUserProfile } from '../Controller/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/multerMiddleware.js';

const router = express.Router();

router.post('/login', authUser);
router.post('/registerAuth', registerUser);
router.get('/logout', logoutUser);
router.get('/profile', protect, getUserProfile);
router.put('/updatedProfile', protect,upload.single('image') ,updateUserProfile);



export default router;
