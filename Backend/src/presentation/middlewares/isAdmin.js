const isAdmin = (req, res, next) => {
    // Kiểm tra xem người dùng có quyền admin không
    console.log("isAdmin Middleware - User Role:", req.user ? req.user.role : 'No user info');
    if(req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ error: "Truy cập bị từ chối! Bạn không có quyền admin." });
    }
}

export default isAdmin;