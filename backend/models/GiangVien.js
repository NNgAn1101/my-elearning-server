const mongoose = require('mongoose');

const giangVienSchema = new mongoose.Schema({
    _id: Number,
    TenGiangVien: String,
    Email: String,
    DienThoai: String,
    ChuyenMon: String
});

module.exports = mongoose.model('GiangVien', giangVienSchema);