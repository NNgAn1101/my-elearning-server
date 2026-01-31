const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const NguoiDung = require('../models/NguoiDung');
const { getNextId } = require('../utils/helper'); // Import hàm tiện ích

// Hàm tạo Token nhanh
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// 1. Đăng ký tài khoản
const registerUser = async (req, res) => {
    try {
        const { HoTen, Email, MatKhau } = req.body;

        // Check trùng email
        if (await NguoiDung.findOne({ Email })) {
            return res.status(400).json({ message: 'Email đã tồn tại' });
        }

        // Mã hóa mật khẩu
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(MatKhau, salt);

        // Tạo ID tự tăng
        const newId = await getNextId(NguoiDung);

        // Tạo User
        const user = await NguoiDung.create({
            _id: newId,
            HoTen,
            Email,
            MatKhau: hashedPassword,
            VaiTro: 'HocVien'
        });

        // Trả về kết quả
        res.status(201).json({
            _id: user._id,
            HoTen: user.HoTen,
            Email: user.Email,
            Token: generateToken(user._id)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2. Đăng nhập
const loginUser = async (req, res) => {
    try {
        const { Email, MatKhau } = req.body;
        const user = await NguoiDung.findOne({ Email });

        if (user && (await bcrypt.compare(MatKhau, user.MatKhau))) {
            res.json({
                _id: user._id,
                HoTen: user.HoTen,
                Email: user.Email,
                VaiTro: user.VaiTro,
                Token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: 'Sai email hoặc mật khẩu' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 3. Lấy thông tin Profile (Yêu cầu phải đăng nhập)
const getUserProfile = async (req, res) => {
    try {
        // req.user.id đã được middleware 'protect' lấy ra từ token
        const user = await NguoiDung.findById(req.user.id).select('-MatKhau'); // Bỏ qua mật khẩu
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User không tồn tại' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 4. Lấy danh sách tất cả (Dành cho Admin hoặc Test)
const getAllUsers = async (req, res) => {
    const users = await NguoiDung.find().select('-MatKhau');
    res.json(users);
};

module.exports = { registerUser, loginUser, getUserProfile, getAllUsers };