const mongoose = require('mongoose');

const loaiKhoaHocSchema = new mongoose.Schema({
    _id: Number,
    TenLoai: String
});

module.exports = mongoose.model('LoaiKhoaHoc', loaiKhoaHocSchema);