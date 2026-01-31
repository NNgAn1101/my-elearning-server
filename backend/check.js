// backend/check.js
const mongoose = require('mongoose');

// --- CẤU HÌNH CỨNG (Để tránh lỗi file .env) ---
// Hãy chắc chắn tên database ở cuối là LEARNING (hoặc tên bạn đang dùng)
const MONGO_URI = 'mongodb://127.0.0.1:27017/LEARNING'; 

const checkDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI);
        console.log(` Đã kết nối tới Database: ${conn.connection.name}`);
        
        // 1. Liệt kê tất cả các bảng (Collections) đang có
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log("\n Danh sách các bảng hiện có trong DB này:");
        collections.forEach(c => console.log(`   - ${c.name}`));

        // 2. Kiểm tra dữ liệu trong bảng 'khoahocs'
        // Lưu ý: Mongoose thường tự thêm 's' vào cuối tên
        const collectionName = 'khoahocs'; 
        const count = await mongoose.connection.db.collection(collectionName).countDocuments();
        
        console.log(`\n Kiểm tra bảng '${collectionName}':`);
        console.log(`   -> Số lượng tìm thấy: ${count} dòng.`);

        if (count > 0) {
            const data = await mongoose.connection.db.collection(collectionName).find().limit(1).toArray();
            console.log("   -> Dữ liệu mẫu (1 dòng đầu):");
            console.log(JSON.stringify(data, null, 2));
        } else {
            console.log("   ->  BẢNG NÀY RỖNG! Bạn cần chạy lại 'npm run seed'");
        }

        process.exit();
    } catch (error) {
        console.error(" Lỗi kết nối:", error.message);
        process.exit(1);
    }
};

checkDB();