const express = require('express');
const router = express.Router();
const { enrollCourse, getMyCourses } = require('../controllers/enrollmentController');

router.post('/', enrollCourse);
router.get('/user/:MaNguoiDung', getMyCourses);

module.exports = router;