const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path'); // <--- 1. Bắt buộc phải thêm dòng này để xử lý đường dẫn
require('dotenv').config(); 

// 1. Kết nối Database
connectDB();

const app = express();

// 2. Middleware
app.use(cors());
app.use(express.json()); 

app.use(express.static(path.join(__dirname, '../frontend')));

// 3. Routes API
// Các API dữ liệu vẫn hoạt động bình thường
app.use('/api/users', require('./routes/userRoutes'));

app.use('/api/courses', require('./routes/courseRoutes'));

app.use('/api/enroll', require('./routes/enrollmentRoutes'));

// 4. Route Trang chủ
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

//
app.get('/test-api', (req, res) => {
    res.send("API Test đang hoạt động!");
});

// 5. Chạy Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Frontend is being served from: ${path.join(__dirname, '../frontend')}`);
});