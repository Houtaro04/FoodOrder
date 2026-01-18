import express from 'express';
import OrderController from '../controllers/OrderController.js';
import { MongoOrderRepository } from '../../infrastructure/repositories/MongoOrderRepository.js';
import { CreateOrderUseCase } from '../../application/order/CreateOrder.usecase.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import isAdmin from '../middlewares/isAdmin.js';

// 1. IMPORT THÊM USER REPOSITORY
import { MongoUserRepository } from '../../infrastructure/repositories/MongoUserRepository.js';

const router = express.Router();

// --- Wiring Order ---
const orderRepository = new MongoOrderRepository();
const createOrderUseCase = new CreateOrderUseCase(orderRepository);
const orderController = new OrderController(createOrderUseCase, orderRepository);

// --- Wiring User (Thêm đoạn này) ---
const userRepository = new MongoUserRepository();

// --- ROUTES ---

// Route Order (Giữ nguyên)
router.get('/orders', authMiddleware, isAdmin, orderController.getAllOrders);
router.put('/orders/:id', authMiddleware, isAdmin, orderController.updateOrderStatus);

// Route User (SỬA LẠI ĐOẠN NÀY)
// Thay vì gọi orderController.getAllUsers (bị lỗi), ta viết hàm trực tiếp tại đây
router.get('/users', authMiddleware, isAdmin, async (req, res) => {
    try {
        const users = await userRepository.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;