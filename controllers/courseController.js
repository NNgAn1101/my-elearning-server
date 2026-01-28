// File: controllers/courseController.js
const { KhoaHoc, BaiHoc } = require('../models');

// Hàm tiện ích ID tự tăng
const getNextId = async (Model) => {
    const lastItem = await Model.findOne().sort({ _id: -1 });
    return lastItem ? lastItem._id + 1 : 1;
};

// 1. Lấy chi tiết khóa học
const getCourseDetail = async (req, res) => {
    try {
        const courseId = req.params.id;
        const course = await KhoaHoc.findById(courseId)
            .populate('MaGiangVien', 'TenGiangVien ChuyenMon')
            .populate('MaLoai', 'TenLoai');

        if (!course) return res.status(404).json({ msg: 'Không tìm thấy khóa học' });

        const lessons = await BaiHoc.find({ MaKhoaHoc: courseId });

        res.json({
            course_info: course,
            curriculum: lessons
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. Tạo khóa học mới
const createCourse = async (req, res) => {
    try {
        const newId = await getNextId(KhoaHoc);
        const newCourse = new KhoaHoc({
            _id: newId,
            ...req.body
        });
        await newCourse.save();
        res.status(201).json({ msg: 'Tạo khóa học thành công', data: newCourse });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 3. Thêm bài học
const addLesson = async (req, res) => {
    try {
        const newId = await getNextId(BaiHoc);
        const newLesson = new BaiHoc({
            _id: newId,
            ...req.body
        });
        await newLesson.save();
        res.status(201).json({ msg: 'Thêm bài học thành công', data: newLesson });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// --- QUAN TRỌNG: Xuất các hàm ra để server.js dùng ---
module.exports = {
    getCourseDetail,
    createCourse,
    addLesson
};