const KhoaHoc = require('../models/KhoaHoc');
const BaiHoc = require('../models/BaiHoc');
const { getNextId } = require('../utils/helper'); // Import hàm tiện ích

// Load các Model liên quan để populate hoạt động
require('../models/GiangVien'); 
require('../models/LoaiKhoaHoc');

// 1. Lấy danh sách khóa học
const getAllCourses = async (req, res) => {
    try {
        const courses = await KhoaHoc.find()
            .populate('MaGiangVien', 'TenGiangVien ChuyenMon')
            .populate('MaLoai', 'TenLoai');
        res.json(courses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. Chi tiết khóa học + Bài học
const getCourseDetail = async (req, res) => {
    try {
        const course = await KhoaHoc.findById(req.params.id)
            .populate('MaGiangVien', 'TenGiangVien ChuyenMon')
            .populate('MaLoai', 'TenLoai');

        if (!course) return res.status(404).json({ msg: 'Không tìm thấy khóa học' });

        const lessons = await BaiHoc.find({ MaKhoaHoc: req.params.id });

        res.json({ course_info: course, curriculum: lessons });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 3. Tạo khóa học
const createCourse = async (req, res) => {
    try {
        const newId = await getNextId(KhoaHoc);
        const newCourse = await KhoaHoc.create({ _id: newId, ...req.body });
        res.status(201).json({ msg: 'Tạo khóa học thành công', data: newCourse });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 4. Thêm bài học
const addLesson = async (req, res) => {
    try {
        const newId = await getNextId(BaiHoc);
        const newLesson = await BaiHoc.create({ _id: newId, ...req.body });
        res.status(201).json({ msg: 'Thêm bài học thành công', data: newLesson });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAllCourses, getCourseDetail, createCourse, addLesson };