// backend/seed.js
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import các Models
const NguoiDung = require('./models/NguoiDung');
const GiangVien = require('./models/GiangVien');
const LoaiKhoaHoc = require('./models/LoaiKhoaHoc');
const KhoaHoc = require('./models/KhoaHoc');
const BaiHoc = require('./models/BaiHoc');
const DangKy = require('./models/DangKy');

const dataGiangVien = [
    { _id: 1, TenGiangVien: 'Lê Văn Cường', Email: 'c@gmail.com', DienThoai: '0909123456', ChuyenMon: 'Lập trình Web' },
    { _id: 2, TenGiangVien: 'Trần Thanh My', Email: 'm@gmail.com', DienThoai: '0909561628', ChuyenMon: 'Lập trình cơ bản' },
    { _id: 3, TenGiangVien: 'Phạm Gia Bảo', Email: 'b@gmail.com', DienThoai: '0982628456', ChuyenMon: 'Thiết kế đồ họa' },
    { _id: 4, TenGiangVien: 'Lý Văn Sinh', Email: 's@gmail.com', DienThoai: '0937158306', ChuyenMon: 'Lập trình java' },
    { _id: 5, TenGiangVien: 'Lý A Sùng', Email: 'asung@gmail.com', DienThoai: '0937158111', ChuyenMon: 'Toán cao cấp' },
    { _id: 6, TenGiangVien: 'Ngọc Xuân Quỳnh', Email: 'quynh@gmail.com', DienThoai: '0937158132', ChuyenMon: 'Kĩ năng thuyết trình' },
    { _id: 7, TenGiangVien: 'Lý Thái Tổ', Email: 'ThaiT@gmail.com', DienThoai: '0937158154', ChuyenMon: 'Kĩ năng làm việc nhóm' },
    { _id: 8, TenGiangVien: 'Phạm Thị Dung', Email: 'd@gmail.com', DienThoai: '0909987654', ChuyenMon: 'Cơ sở dữ liệu' },
    { _id: 9, TenGiangVien: 'Nguyễn Văn Hòa', Email: 'hoa@gmail.com', DienThoai: '0911222333', ChuyenMon: 'Lập trình Python' },
    { _id: 10, TenGiangVien: 'Đặng Thị Mai', Email: 'mai@gmail.com', DienThoai: '0922333444', ChuyenMon: 'Trí tuệ nhân tạo' }
];

const dataLoaiKhoaHoc = [
    { _id: 1, TenLoai: 'Công nghệ thông tin' },
    { _id: 2, TenLoai: 'Thiết kế' },
    { _id: 3, TenLoai: 'Kỹ năng mềm' },
    { _id: 4, TenLoai: 'Ngoại ngữ' },
    { _id: 5, TenLoai: 'Kinh doanh' },
    { _id: 6, TenLoai: 'Marketing' },
    { _id: 7, TenLoai: 'Kế toán' },
    { _id: 8, TenLoai: 'Tài chính' },
    { _id: 9, TenLoai: 'Phát triển bản thân' },
    { _id: 10, TenLoai: 'Tin học văn phòng' }
];

const dataKhoaHoc = [
    { _id: 1, TenKhoaHoc: 'Lập trình Web cơ bản', MaGiangVien: 1, MaLoai: 1, MoTa: 'Học HTML, CSS, JS', ThoiLuong: '30 giờ', HocPhi: 1500000, TrangThai: 'Đang mở' },
    { _id: 2, TenKhoaHoc: 'SQL Server từ cơ bản', MaGiangVien: 2, MaLoai: 1, MoTa: 'Học SQL Server', ThoiLuong: '25 giờ', HocPhi: 1200000, TrangThai: 'Đang mở' },
    { _id: 3, TenKhoaHoc: 'Python cơ bản', MaGiangVien: 3, MaLoai: 1, MoTa: 'Học Python từ đầu', ThoiLuong: '40 giờ', HocPhi: 1800000, TrangThai: 'Đang mở' },
    { _id: 4, TenKhoaHoc: 'Thiết kế Photoshop', MaGiangVien: 4, MaLoai: 2, MoTa: 'Học thiết kế ảnh', ThoiLuong: '35 giờ', HocPhi: 1600000, TrangThai: 'Đang mở' },
    { _id: 5, TenKhoaHoc: 'Kỹ năng thuyết trình', MaGiangVien: 6, MaLoai: 3, MoTa: 'Tự tin nói trước đám đông', ThoiLuong: '20 giờ', HocPhi: 900000, TrangThai: 'Đang mở' },
    { _id: 6, TenKhoaHoc: 'Java nâng cao', MaGiangVien: 4, MaLoai: 1, MoTa: 'Lập trình Java OOP', ThoiLuong: '45 giờ', HocPhi: 2000000, TrangThai: 'Đang mở' },
    { _id: 7, TenKhoaHoc: 'Tin học văn phòng', MaGiangVien: 8, MaLoai: 7, MoTa: 'Word Excel PowerPoint', ThoiLuong: '30 giờ', HocPhi: 1000000, TrangThai: 'Đang mở' },
    { _id: 8, TenKhoaHoc: 'Marketing Online', MaGiangVien: 2, MaLoai: 6, MoTa: 'Facebook & Google Ads', ThoiLuong: '25 giờ', HocPhi: 1400000, TrangThai: 'Đang mở' },
    { _id: 9, TenKhoaHoc: 'Kế toán căn bản', MaGiangVien: 8, MaLoai: 5, MoTa: 'Nguyên lý kế toán', ThoiLuong: '30 giờ', HocPhi: 1500000, TrangThai: 'Đang mở' },
    { _id: 10, TenKhoaHoc: 'Giao tiếp hiệu quả', MaGiangVien: 7, MaLoai: 3, MoTa: 'Kỹ năng mềm', ThoiLuong: '15 giờ', HocPhi: 800000, TrangThai: 'Đang mở' }
];

const dataBaiHoc = [
    { _id: 1, MaKhoaHoc: 3, TenBaiHoc: 'Cài đặt Python', VideoURL: 'video4.mp4', TaiLieu: 'python.pdf' },
    { _id: 2, MaKhoaHoc: 3, TenBaiHoc: 'Biến và kiểu dữ liệu', VideoURL: 'video5.mp4', TaiLieu: 'bien.pdf' },
    { _id: 3, MaKhoaHoc: 4, TenBaiHoc: 'Công cụ Photoshop', VideoURL: 'video6.mp4', TaiLieu: 'ps.pdf' },
    { _id: 4, MaKhoaHoc: 5, TenBaiHoc: 'Kỹ năng mở đầu', VideoURL: 'video7.mp4', TaiLieu: 'giaotiep.pdf' },
    { _id: 5, MaKhoaHoc: 6, TenBaiHoc: 'Giới thiệu Java OOP', VideoURL: 'video8.mp4', TaiLieu: 'java.pdf' },
    { _id: 6, MaKhoaHoc: 7, TenBaiHoc: 'Word cơ bản', VideoURL: 'video9.mp4', TaiLieu: 'word.pdf' },
    { _id: 7, MaKhoaHoc: 8, TenBaiHoc: 'Chiến lược marketing', VideoURL: 'video10.mp4', TaiLieu: 'marketing.pdf' }
];

const dataDangKy = [
    { _id: 1, MaNguoiDung: 1, MaKhoaHoc: 1, TrangThai: 'Đã đăng ký' },
    { _id: 2, MaNguoiDung: 2, MaKhoaHoc: 2, TrangThai: 'Đã đăng ký' },
    { _id: 3, MaNguoiDung: 3, MaKhoaHoc: 3, TrangThai: 'Đã đăng ký' },
    { _id: 4, MaNguoiDung: 4, MaKhoaHoc: 4, TrangThai: 'Đã đăng ký' },
    { _id: 5, MaNguoiDung: 5, MaKhoaHoc: 5, TrangThai: 'Đã đăng ký' },
    { _id: 6, MaNguoiDung: 6, MaKhoaHoc: 6, TrangThai: 'Đã đăng ký' },
    { _id: 7, MaNguoiDung: 7, MaKhoaHoc: 7, TrangThai: 'Đã đăng ký' },
    { _id: 8, MaNguoiDung: 8, MaKhoaHoc: 8, TrangThai: 'Đã đăng ký' }
];

// Hàm chạy nạp dữ liệu
const seedDB = async () => {
    try {
        await connectDB();
        console.log("🔌 Đã kết nối DB...");

        // Xóa sạch dữ liệu cũ
        try { await NguoiDung.collection.drop(); } catch(e) {}
        try { await GiangVien.collection.drop(); } catch(e) {}
        try { await LoaiKhoaHoc.collection.drop(); } catch(e) {}
        try { await KhoaHoc.collection.drop(); } catch(e) {}
        try { await BaiHoc.collection.drop(); } catch(e) {}
        try { await DangKy.collection.drop(); } catch(e) {}
        console.log(" Đã dọn dẹp sạch Database cũ.");


        // Tạo mật khẩu "123" phiên bản đã mã hóa
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('123', salt);
        
        console.log(" Đã tạo mã hóa cho mật khẩu '123'");

        // --- KHAI BÁO USER VỚI MẬT KHẨU MÃ HÓA ---
        const dataNguoiDung = [
            { _id: 1, HoTen: 'Nguyễn Thị Bé', Email: 'ntb@gmail.com', MatKhau: hashedPassword, VaiTro: 'HocVien' },
            { _id: 2, HoTen: 'Trần Văn An', Email: 'tva@gmail.com', MatKhau: hashedPassword, VaiTro: 'HocVien' },
            { _id: 3, HoTen: 'Phan Thị Thanh', Email: 'ptt@gmail.com', MatKhau: hashedPassword, VaiTro: 'HocVien' },
            { _id: 4, HoTen: 'Võ Thành Minh', Email: 'vtm@gmail.com', MatKhau: hashedPassword, VaiTro: 'HocVien' },
            { _id: 5, HoTen: 'Lê Khánh', Email: 'lk@gmail.com', MatKhau: hashedPassword, VaiTro: 'HocVien' },
            { _id: 6, HoTen: 'Trần Bảo', Email: 'tb@gmail.com', MatKhau: hashedPassword, VaiTro: 'HocVien' },
            { _id: 7, HoTen: 'Nguyễn Nam', Email: 'nn@gmail.com', MatKhau: hashedPassword, VaiTro: 'HocVien' },
            // Lưu ý: User 8 (Admin) mình cũng để pass là 123 cho dễ nhớ khi test
            { _id: 8, HoTen: 'Chí Tâm', Email: 'tam@gmail.com', MatKhau: hashedPassword, VaiTro: 'Admin' },
            { _id: 9, HoTen: 'Hoàng Minh Đức', Email: 'hmd@gmail.com', MatKhau: hashedPassword, VaiTro: 'HocVien' },
            { _id: 10, HoTen: 'Nguyễn Thảo Vy', Email: 'ntv@gmail.com', MatKhau: hashedPassword, VaiTro: 'HocVien' },
            { _id: 11, HoTen: 'Phạm Quốc Huy', Email: 'pqh@gmail.com', MatKhau: hashedPassword, VaiTro: 'HocVien' },
            { _id: 12, HoTen: 'Lê Mỹ Linh', Email: 'lml@gmail.com', MatKhau: hashedPassword, VaiTro: 'HocVien' },
            { _id: 13, HoTen: 'Bùi Anh Tuấn', Email: 'bat@gmail.com', MatKhau: hashedPassword, VaiTro: 'HocVien' },
            // User 14 (Admin) pass cũng là 123
            { _id: 14, HoTen: 'Admin', Email: 'admin@gmail.com', MatKhau: hashedPassword, VaiTro: 'Admin' }
        ];

        // Nạp dữ liệu vào Database
        await NguoiDung.insertMany(dataNguoiDung);
        await GiangVien.insertMany(dataGiangVien);
        await LoaiKhoaHoc.insertMany(dataLoaiKhoaHoc);
        await KhoaHoc.insertMany(dataKhoaHoc);
        await BaiHoc.insertMany(dataBaiHoc);
        await DangKy.insertMany(dataDangKy);

        console.log(" Đã nhập FULL dữ liệu (Có bảo mật) thành công!");
        process.exit();
    } catch (err) {
        console.error(" Lỗi nghiêm trọng:", err);
        process.exit(1);
    }
};

seedDB();