// src/app.js
import express from 'express';
import cors from 'cors';

// Import các routes (Sau này sẽ bỏ comment khi bạn viết xong routes)
// import orderRoutes from './presentation/routes/orderRoutes.js';
import userRoutes from './presentation/routes/userRoutes.js';
import productRoutes from './presentation/routes/productRoutes.js';
import orderRoutes from './presentation/routes/orderRoutes.js';
import isAdmin from './presentation/middlewares/isAdmin.js';
import { authMiddleware } from './presentation/middlewares/authMiddleware.js';
import adminRoutes from './presentation/routes/adminRoutes.js';

const app = express();

// --- Middleware ---
app.use(cors()); // Cho phép Frontend gọi API
app.use(express.json()); // Để đọc được JSON từ body request

// --- Routes ---
// API test để xem server sống hay chết
app.get('/', (req, res) => {
  res.send('Backend Order Food đang chạy ngon lành! 🚀');
});

app.use('/api/users', userRoutes);

app.use('/api/auth', userRoutes); // Sử dụng routes cho xác thực người dùng

app.use('/api/products', productRoutes); // Sử dụng routes cho sản phẩm

app.use('/api/orders', orderRoutes);

app.use('/api/admin', authMiddleware, isAdmin, adminRoutes);

// --- Lỗi 404 cho các route không tồn tại ---
app.use((req, res, next) => {
  res.status(404).json({ error: "Route không tồn tại." });
});

export default app;