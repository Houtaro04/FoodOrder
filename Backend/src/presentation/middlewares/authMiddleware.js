import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    // 1. Log để kiểm tra xem hàm này có chạy không
    console.log("🔥 [1] AuthMiddleware ĐANG CHẠY...");

    const authHeader = req.headers.authorization;
    if (!authHeader) {
        console.log("❌ Không có Header Authorization");
        return res.status(401).json({ error: "Bạn chưa đăng nhập." });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        console.log("❌ Token rỗng");
        return res.status(401).json({ error: "Token lỗi." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key_tam_thoi');
        
        // 2. Gắn user vào request
        req.user = decoded; 
        console.log("✅ [2] Giải mã thành công. User:", req.user);
        
        next();
    } catch (error) {
        console.log("❌ Lỗi Verify:", error.message);
        return res.status(403).json({ error: "Token hết hạn/sai." });
    }
};