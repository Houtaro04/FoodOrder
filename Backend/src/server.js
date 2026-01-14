// src/server.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js'; // Import cái app từ bước 2

// Load biến môi trường từ file .env
dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Hàm kết nối DB và chạy server
const startServer = async () => {
  try {
    // 1. Kết nối MongoDB
    console.log('⏳ Đang kết nối tới MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('✅ Đã kết nối MongoDB thành công!');

    // 2. Chạy Server
    app.listen(PORT, () => {
      console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('❌ Không thể kết nối tới Database:', error.message);
    process.exit(1); // Dừng chương trình nếu lỗi DB
  }
};

startServer();