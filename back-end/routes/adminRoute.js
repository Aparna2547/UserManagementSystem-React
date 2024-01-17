import express from 'express';
// import { authAdmin } from '../Controller/adminController';
import {addUser, authAdmin, blockUser, deleteUser, editUser, getUser, logoutAdmin,users} from '../Controller/adminController.js'



const router = express.Router();

// router.get('/', (req, res) => {
//   const adminData = authAdmin(); 
//   res.json(adminData); 
// });

router.post('/login',authAdmin)
router.post('/adduser',addUser)
router.get('/getUser/:id',getUser)
router.put('/edituser',editUser)
router.delete('/deleteuser/:userId',deleteUser)
router.put('/blockUser',blockUser)
router.get('/users', users)
router.get('/logout',logoutAdmin)
export default router;
