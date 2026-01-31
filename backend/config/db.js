// backend/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Lưu ý: Tên Database của bạn hiện tại đang là 'LEARNING'
        // Nếu bạn muốn đổi tên khác, hãy sửa chữ 'LEARNING' bên dưới
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/LEARNING');

        console.log(`MongoDB Connected: ${conn.connection.host}`);
        
        // --- QUAN TRỌNG: Dòng này sẽ hiện tên Database bạn đang kết nối ---
        console.log(`Đang sử dụng Database có tên là: "${conn.connection.name}"`); 
        
    } catch (error) {
        console.error(` Lỗi kết nối: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;