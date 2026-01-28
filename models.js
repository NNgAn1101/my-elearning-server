const mongoose = require('mongoose');

// 1. Định nghĩa Schema (Copy từ seed.js nhưng bỏ phần seed dữ liệu)
const NguoiDungSchema = new mongoose.Schema({
    _id: Number, 
    HoTen: String, Email: String, MatKhau: String, VaiTro: String, DienThoai: String, DiaChi: String,
    NgayDangKy: { type: Date, default: Date.now }
});

const GiangVienSchema = new mongoose.Schema({
    _id: Number, TenGiangVien: String, Email: String, DienThoai: String, ChuyenMon: String
});

const LoaiKhoaHocSchema = new mongoose.Schema({
    _id: Number, TenLoai: String
});

const KhoaHocSchema = new mongoose.Schema({
    _id: Number,
    TenKhoaHoc: String,
    MaGiangVien: { type: Number, ref: 'GiangVien' },
    MaLoai: { type: Number, ref: 'LoaiKhoaHoc' },
    MoTa: String, ThoiLuong: String, HocPhi: Number, TrangThai: String
});

const BaiHocSchema = new mongoose.Schema({
    _id: Number,
    MaKhoaHoc: { type: Number, ref: 'KhoaHoc' },
    TenBaiHoc: String, VideoURL: String, TaiLieu: String
});

const DangKySchema = new mongoose.Schema({
    _id: Number,
    MaNguoiDung: { type: Number, ref: 'NguoiDung' },
    MaKhoaHoc: { type: Number, ref: 'KhoaHoc' },
    NgayDangKy: { type: Date, default: Date.now },
    TrangThai: String
});

// --- QUAN TRỌNG: Kiểm tra kỹ phần này ---
// Nếu thiếu đoạn này, controller sẽ báo lỗi undefined
const NguoiDung = mongoose.models.NguoiDung || mongoose.model('NguoiDung', NguoiDungSchema);
const GiangVien = mongoose.models.GiangVien || mongoose.model('GiangVien', GiangVienSchema);
const LoaiKhoaHoc = mongoose.models.LoaiKhoaHoc || mongoose.model('LoaiKhoaHoc', LoaiKhoaHocSchema);
const KhoaHoc = mongoose.models.KhoaHoc || mongoose.model('KhoaHoc', KhoaHocSchema);
const BaiHoc = mongoose.models.BaiHoc || mongoose.model('BaiHoc', BaiHocSchema);
const DangKy = mongoose.models.DangKy || mongoose.model('DangKy', DangKySchema);

module.exports = {
    NguoiDung,
    GiangVien,
    LoaiKhoaHoc,
    KhoaHoc,
    BaiHoc,
    DangKy
};