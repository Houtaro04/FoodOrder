// src/app.js
import express from 'express';
import cors from 'cors';

// Import các routes (Sau này sẽ bỏ comment khi bạn viết xong routes)
// import orderRoutes from './presentation/routes/orderRoutes.js';
import userRoutes from './presentation/routes/userRoutes.js';

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

// app.use('/api/orders', orderRoutes);

export default app;