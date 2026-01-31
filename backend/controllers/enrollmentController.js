const DangKy = require('../models/DangKy');
const { getNextId } = require('../utils/helper'); // Import hàm tiện ích
require('../models/NguoiDung'); 
require('../models/KhoaHoc');

// 1. Đăng ký khóa học
const enrollCourse = async (req, res) => {
    try {
        const { MaNguoiDung, MaKhoaHoc } = req.body;

        if (!MaNguoiDung || !MaKhoaHoc) {
            return res.status(400).json({ message: 'Thiếu thông tin' });
        }

        const exists = await DangKy.findOne({ MaNguoiDung, MaKhoaHoc });
        if (exists) return res.status(400).json({ message: 'Đã đăng ký rồi' });

        const newId = await getNextId(DangKy);
        const newEnrollment = await DangKy.create({
            _id: newId,
            MaNguoiDung,
            MaKhoaHoc,
            TrangThai: 'Đã đăng ký',
            NgayDangKy: new Date()
        });

        res.status(201).json({ message: 'Đăng ký thành công!', data: newEnrollment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2. Lấy khóa học của User
const getMyCourses = async (req, res) => {
    try {
        const myCourses = await DangKy.find({ MaNguoiDung: req.params.MaNguoiDung })
            .populate('MaNguoiDung', 'HoTen Email')
            .populate('MaKhoaHoc', 'TenKhoaHoc HinhAnh MoTa HocPhi');
            
        res.json(myCourses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { enrollCourse, getMyCourses };