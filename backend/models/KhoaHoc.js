const mongoose = require('mongoose');

const khoaHocSchema = new mongoose.Schema({
    _id: Number,
    TenKhoaHoc: String,
    MaGiangVien: { type: Number, ref: 'GiangVien' },
    MaLoai: { type: Number, ref: 'LoaiKhoaHoc' },
    MoTa: String,
    ThoiLuong: String,
    HocPhi: Number,
    TrangThai: String
});

module.exports = mongoose.model('KhoaHoc', khoaHocSchema, 'khoahocs');