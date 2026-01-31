// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    let token;

    // 1. Kiểm tra xem trong header có gửi Token kèm chữ 'Bearer' không
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // 2. Lấy token ra (bỏ chữ Bearer đi)
            token = req.headers.authorization.split(' ')[1];

            // 3. Giải mã token để lấy ID user
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 4. Gán thông tin user vào biến req để dùng ở các hàm sau
            req.user = { id: decoded.id };

            next(); // Cho phép đi tiếp
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Token không hợp lệ, vui lòng đăng nhập lại!' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Không tìm thấy Token, bạn không có quyền truy cập!' });
    }
};

module.exports = { protect };