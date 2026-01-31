const express = require('express');
const router = express.Router();
const { getAllCourses, getCourseDetail, createCourse, addLesson } = require('../controllers/courseController');

router.get('/', getAllCourses);
router.get('/:id', getCourseDetail);
router.post('/', createCourse);
router.post('/lesson', addLesson);

module.exports = router;