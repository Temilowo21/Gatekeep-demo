import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
const router = express.Router();
import {
    authUsers,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
} from '../controllers/userController.js';

router.route('/').get(getUsers).post(registerUser);
router.post('/logout', logoutUser);
router.post('/auth', authUsers);
router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

router
    .route('/:id')
    .delete(deleteUser)
    .get(getUserById)
    .put(protect, admin, updateUser);
export default router;