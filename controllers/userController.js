// File: controllers/userController.js
const { DangKy, KhoaHoc } = require('../models');

const getNextId = async (Model) => {
    const lastItem = await Model.findOne().sort({ _id: -1 });
    return lastItem ? lastItem._id + 1 : 1;
};

const enrollCourse = async (req, res) => {
    try {
        const { MaNguoiDung, MaKhoaHoc } = req.body;
        const existing = await DangKy.findOne({ MaNguoiDung, MaKhoaHoc });
        if (existing) {
            return res.status(400).json({ msg: 'Bạn đã đăng ký khóa học này rồi!' });
        }

        const newId = await getNextId(DangKy);
        const newEnrollment = new DangKy({
            _id: newId,
            MaNguoiDung,
            MaKhoaHoc,
            TrangThai: 'Đã đăng ký'
        });

        await newEnrollment.save();
        res.status(201).json({ msg: 'Đăng ký thành công!', data: newEnrollment });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getMyCourses = async (req, res) => {
    try {
        const { userId } = req.params;
        const enrollments = await DangKy.find({ MaNguoiDung: userId }).populate('MaKhoaHoc');
        res.json(enrollments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// --- Xuất hàm ---
module.exports = {
    enrollCourse,
    getMyCourses
};