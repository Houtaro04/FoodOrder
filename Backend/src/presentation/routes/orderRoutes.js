import express from 'express';
// 1. Import Middleware
import { authMiddleware } from '../middlewares/authMiddleware.js';

// 2. Import các lớp cần thiết (Controller, UseCase, Repository)
import { OrderController } from '../controllers/OrderController.js';
import { CreateOrderUseCase } from '../../application/order/CreateOrder.usecase.js';
import { MongoOrderRepository } from '../../infrastructure/repositories/MongoOrderRepository.js';
import { MongoProductRepository } from '../../infrastructure/repositories/MongoProductRepository.js';

const router = express.Router();

// --- 3. Wiring (Khởi tạo và kết nối các lớp lại với nhau) ---

// Bước 1: Chuẩn bị Repository (Kết nối DB)
const orderRepository = new MongoOrderRepository();
const productRepository = new MongoProductRepository(); // Cần cái này để check giá món ăn

// Bước 2: Chuẩn bị Use Case (Bơm Repository vào)
const createOrderUseCase = new CreateOrderUseCase(orderRepository, productRepository);

// Bước 3: Chuẩn bị Controller (Bơm Use Case vào)
const orderController = new OrderController(createOrderUseCase);

// --- 4. Định nghĩa Route ---
// Giải thích: 
// - Khách gọi POST /api/orders
// - Chạy qua authMiddleware để kiểm tra đăng nhập
// - Nếu OK thì chạy vào orderController.create
router.post('/', authMiddleware, orderController.create);

export default router;