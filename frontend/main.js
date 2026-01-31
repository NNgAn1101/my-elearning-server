/* public/js/main.js */

const API_URL = '/api'; // Đường dẫn API tương đối

// Lấy thông tin user đang đăng nhập từ LocalStorage
const currentUser = JSON.parse(localStorage.getItem('user'));

// ============================================================
// 1. CÁC HÀM XỬ LÝ GIAO DIỆN CHUNG (HEADER, LOGOUT)
// ============================================================

// Kiểm tra trạng thái đăng nhập để hiển thị Header
function checkLogin() {
    const authLinks = document.getElementById('auth-links');
    if (!authLinks) return;

    if (currentUser) {
        // --- ĐÃ ĐĂNG NHẬP ---
        // Hiển thị: Tên + Nút Khóa học của tôi + Admin (nếu có) + Đăng xuất
        authLinks.innerHTML = `
            <span style="margin-right:10px; font-weight:500">Xin chào, <b>${currentUser.HoTen}</b></span>
            
            <a href="my-courses.html" class="btn btn-outline" style="margin-right:5px">
                <i class="fas fa-book"></i> Khóa học của tôi
            </a>

            ${currentUser.VaiTro === 'Admin' ? 
                `<a href="admin.html" class="btn btn-outline" style="color:red; border-color:red; margin-right:5px">
                    <i class="fas fa-user-shield"></i> Admin
                </a>` : ''
            }

            <button onclick="logout()" class="btn btn-danger">
                <i class="fas fa-sign-out-alt"></i> Đăng xuất
            </button>
        `;
    } else {
        // --- CHƯA ĐĂNG NHẬP ---
        // Hiển thị: Nút Đăng nhập + Đăng ký
        authLinks.innerHTML = `
            <a href="login.html" class="btn btn-outline">Đăng nhập</a>
            <a href="register.html" class="btn btn-primary">Đăng ký</a>
        `;
    }
}

// Hàm Đăng xuất
function logout() {
    if(confirm('Bạn có chắc muốn đăng xuất?')) {
        localStorage.removeItem('user');
        window.location.href = 'index.html';
    }
}

// ============================================================
// 2. LOGIC TRANG CHỦ (HIỂN THỊ KHÓA HỌC)
// ============================================================

async function loadHomeCourses() {
    const container = document.getElementById('course-list');
    if (!container) return; // Nếu không phải trang chủ thì thoát

    try {
        const res = await fetch(`${API_URL}/courses`);
        const courses = await res.json();

        if (courses.length === 0) {
            container.innerHTML = '<p style="text-align:center; width:100%">Chưa có khóa học nào.</p>';
            return;
        }

        // Tạo HTML thẻ khóa học (Card)
        container.innerHTML = courses.map(c => `
            <div class="course-card">
                <div class="card-img">
                    <i class="fas fa-laptop-code"></i>
                </div>
                
                <div class="card-body">
                    <h3 class="card-title">${c.TenKhoaHoc}</h3>
                    <p class="card-desc">${c.MoTa || 'Khóa học chất lượng cao, cập nhật kiến thức mới nhất.'}</p>
                    
                    <div class="card-meta">
                        <span class="price">${c.HocPhi.toLocaleString('vi-VN')} đ</span>
                        <button onclick="enrollNow(${c._id})" class="btn btn-primary">
                            <i class="fas fa-cart-plus"></i> Đăng ký
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

    } catch (err) {
        console.error(err);
        container.innerHTML = '<p style="color:red; text-align:center">Lỗi kết nối server!</p>';
    }
}

// Hàm xử lý khi bấm nút "Đăng ký"
async function enrollNow(courseId) {
    // 1. Kiểm tra chưa đăng nhập
    if (!currentUser) {
        if(confirm("Bạn cần đăng nhập để đăng ký khóa học này. Đi đến trang đăng nhập ngay?")) {
            window.location.href = 'login.html';
        }
        return;
    }

    // 2. Gọi API đăng ký
    try {
        const res = await fetch(`${API_URL}/enroll`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                MaNguoiDung: currentUser._id, 
                MaKhoaHoc: courseId 
            })
        });
        
        const data = await res.json();
        
        if (res.ok) {
            alert(" " + data.msg);
        } else {
            alert(" " + data.msg);
        }
    } catch (err) {
        console.error(err);
        alert(" Lỗi hệ thống, vui lòng thử lại sau.");
    }
}

// ============================================================
// 3. LOGIC TRANG "KHÓA HỌC CỦA TÔI"
// ============================================================

async function loadMyCourses() {
    const container = document.getElementById('my-course-list');
    if (!container) return; // Nếu không ở trang my-courses.html thì thoát

    if (!currentUser) {
        alert("Vui lòng đăng nhập!");
        window.location.href = 'login.html';
        return;
    }

    try {
        const res = await fetch(`${API_URL}/my-courses/${currentUser._id}`);
        const data = await res.json();

        if (data.length === 0) {
            container.innerHTML = '<p>Bạn chưa đăng ký khóa học nào.</p>';
        } else {
            container.innerHTML = data.map(item => `
                <div class="course-card" style="border-left: 5px solid #27ae60;">
                    <div class="card-body">
                        <h3 class="card-title">${item.MaKhoaHoc.TenKhoaHoc}</h3>
                        <p><b>Giảng viên ID:</b> ${item.MaKhoaHoc.MaGiangVien}</p>
                        <p><b>Ngày đăng ký:</b> ${new Date(item.NgayDangKy).toLocaleDateString('vi-VN')}</p>
                        <br>
                        <button class="btn btn-primary" style="background:#27ae60">
                            <i class="fas fa-play-circle"></i> Vào học ngay
                        </button>
                    </div>
                </div>
            `).join('');
        }
    } catch (err) {
        console.error(err);
        container.innerHTML = '<p>Lỗi tải dữ liệu.</p>';
    }
}

// ============================================================
// 4. LOGIC XỬ LÝ FORM (LOGIN, REGISTER, ADMIN)
// ============================================================

// Xử lý Đăng nhập
async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;

    try {
        const res = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Email: email, MatKhau: pass })
        });

        const data = await res.json();

        if (res.ok) {
            localStorage.setItem('user', JSON.stringify(data.user));
            alert(" Đăng nhập thành công!");
            window.location.href = 'index.html';
        } else {
            alert(" " + data.msg);
        }
    } catch (err) {
        alert("Lỗi kết nối server");
    }
}

// Xử lý Đăng ký
async function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;

    try {
        const res = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ HoTen: name, Email: email, MatKhau: pass })
        });

        const data = await res.json();

        if (res.ok) {
            alert(" Đăng ký thành công! Vui lòng đăng nhập.");
            window.location.href = 'login.html';
        } else {
            alert(" " + data.msg);
        }
    } catch (err) {
        alert("Lỗi kết nối server");
    }
}

// Xử lý Thêm khóa học (Admin)
async function handleAddCourse(e) {
    e.preventDefault();
    const data = {
        TenKhoaHoc: document.getElementById('c-name').value,
        MoTa: document.getElementById('c-desc').value,
        HocPhi: Number(document.getElementById('c-price').value),
        ThoiLuong: document.getElementById('c-duration').value,
        TrangThai: 'Đang mở'
    };

    try {
        const res = await fetch(`${API_URL}/admin/courses`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        if(res.ok) {
            alert(' Đã thêm khóa học thành công!');
            e.target.reset(); 
        } else {
            alert(' Lỗi khi thêm khóa học');
        }
    } catch (err) {
        alert("Lỗi server");
    }
}

// ============================================================
// 5. KHỞI CHẠY (MAIN)
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Luôn chạy kiểm tra header
    checkLogin();

    // 2. Nếu ở trang chủ thì load khóa học
    loadHomeCourses();

    // 3. Nếu ở trang "Khóa học của tôi" thì load danh sách đã mua
    loadMyCourses();

    // 4. Gắn sự kiện cho Form Login (nếu có)
    const loginForm = document.getElementById('login-form');
    if (loginForm) loginForm.addEventListener('submit', handleLogin);

    // 5. Gắn sự kiện cho Form Register (nếu có)
    const regForm = document.getElementById('register-form');
    if (regForm) regForm.addEventListener('submit', handleRegister);

    // 6. Gắn sự kiện cho Form Admin (nếu có)
    const adminForm = document.getElementById('add-course-form');
    if (adminForm) adminForm.addEventListener('submit', handleAddCourse);
});