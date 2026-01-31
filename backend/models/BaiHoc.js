const mongoose = require('mongoose');

const baiHocSchema = new mongoose.Schema({
    _id: Number,
    MaKhoaHoc: { type: Number, ref: 'KhoaHoc' },
    TenBaiHoc: String,
    VideoURL: String,
    TaiLieu: String
});

module.exports = mongoose.model('BaiHoc', baiHocSchema, 'baihocs');