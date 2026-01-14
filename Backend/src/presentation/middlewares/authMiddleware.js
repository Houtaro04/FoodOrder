import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  // 1. Lấy token từ header gửi lên (Dạng: "Bearer eyJhbGciOi...")
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Truy cập bị từ chối! Bạn chưa đăng nhập." });
  }

  // Tách chữ "Bearer " ra để lấy phần token phía sau
  const token = authHeader.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ error: "Token không hợp lệ." });
  }

  try {
    // 2. Dịch ngược (Verify) token xem có đúng chữ ký của server không
    // process.env.JWT_SECRET phải giống hệt lúc bạn tạo token ở hàm Login
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key_tam_thoi');

    // 3. Nếu đúng, gắn thông tin user vào biến req để Controller dùng
    // (Lúc này req.user sẽ có { id: '...', role: '...' })
    req.user = decoded;

    // 4. Cho phép đi tiếp vào Controller
    next(); 

  } catch (error) {
    return res.status(403).json({ error: "Token hết hạn hoặc không đúng." });
  }
};