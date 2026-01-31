const mongoose = require('mongoose');

const nguoiDungSchema = new mongoose.Schema({
    _id: Number, // Quan trọng: Giữ ID số để khớp dữ liệu cũ
    HoTen: String,
    Email: { type: String, required: true },
    MatKhau: String,
    VaiTro: String,
    DienThoai: String,
    DiaChi: String,
    NgayDangKy: { type: Date, default: Date.now }
});

module.exports = mongoose.model('NguoiDung', nguoiDungSchema);