const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import Controller
const courseController = require('./controllers/courseController');
const userController = require('./controllers/userController');

// --- DEBUG CODE (Thêm đoạn này để kiểm tra) ---
console.log('Kiểm tra import courseController:', courseController); 
// Nếu nó hiện { getCourseDetail: [Function] ... } là đúng. 
// Nếu hiện {} hoặc undefined là sai.
// ----------------------------------------------

const app = express();
app.use(express.json());
app.use(cors());

// Kết nối DB
mongoose.connect('mongodb://127.0.0.1:27017/LEARNING')
    .then(() => console.log(' Connected to MongoDB'))
    .catch(err => console.error(err));

// --- ROUTES ---
// Lưu ý: Gọi hàm từ object controller đã import ở trên
app.get('/api/courses/:id', courseController.getCourseDetail);
app.post('/api/enroll', userController.enrollCourse);
app.get('/api/my-courses/:userId', userController.getMyCourses);
app.post('/api/admin/courses', courseController.createCourse);
app.post('/api/admin/lessons', courseController.addLesson);

app.listen(3000, () => {
    console.log(' Server running on port 3000');
});