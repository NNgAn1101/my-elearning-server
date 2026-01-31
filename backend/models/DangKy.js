const mongoose = require('mongoose');

const dangKySchema = new mongoose.Schema({
    _id: Number,
    MaNguoiDung: { type: Number, ref: 'NguoiDung' },
    MaKhoaHoc: { type: Number, ref: 'KhoaHoc' },
    NgayDangKy: { type: Date, default: Date.now },
    TrangThai: String
});

module.exports = mongoose.model('DangKy', dangKySchema);