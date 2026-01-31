const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getAllUsers, getUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware'); // Import bảo vệ

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', getAllUsers); // Route test lấy danh sách

// Route này được BẢO VỆ: Phải có Token mới xem được thông tin cá nhân
router.get('/profile', protect, getUserProfile); 

module.exports = router;