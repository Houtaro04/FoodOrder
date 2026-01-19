import express from 'express';
import OrderController from '../controllers/OrderController.js';
import ProductController from '../controllers/ProductController.js';
import { CreateOrderUseCase } from '../../application/order/CreateOrder.usecase.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import isAdmin from '../middlewares/isAdmin.js';

// Import UseCase Thêm món
import AddNewProductUseCase from '../../application/product/AddNewProduct.usecases.js';
// 1. IMPORT THÊM USECASE LẤY DANH SÁCH MÓN (File này bạn đã có trong thư mục)
import GetAllProductUseCase from '../../application/product/GetAllProduct.usecases.js'; 

// Import Repository
import { MongoUserRepository } from '../../infrastructure/repositories/MongoUserRepository.js';
import { MongoOrderRepository } from '../../infrastructure/repositories/MongoOrderRepository.js';
import { MongoProductRepository } from '../../infrastructure/repositories/MongoProductRepository.js';

const router = express.Router();

// --- Wiring Order ---
const orderRepository = new MongoOrderRepository();
const createOrderUseCase = new CreateOrderUseCase(orderRepository);
const orderController = new OrderController(createOrderUseCase, orderRepository);

// --- Wiring User ---
const userRepository = new MongoUserRepository();

// --- Wiring Product (SỬA ĐOẠN NÀY) ---
const productRepository = new MongoProductRepository();

// A. Khởi tạo UseCase Thêm món
const addNewProductUseCase = new AddNewProductUseCase(productRepository);

// B. Khởi tạo UseCase Lấy danh sách món (Bổ sung dòng này)
const getAllProductUseCase = new GetAllProductUseCase(productRepository);

// C. Truyền cả 2 UseCase vào Controller
const productController = new ProductController(addNewProductUseCase, getAllProductUseCase);

// --- ROUTES ---

// Route Order
router.get('/orders', authMiddleware, isAdmin, orderController.getAllOrders);
router.put('/orders/:id', authMiddleware, isAdmin, orderController.updateOrderStatus);

// Route User
router.get('/users', authMiddleware, isAdmin, async (req, res) => {
    try {
        const users = await userRepository.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route Product
router.post('/products', authMiddleware, isAdmin, productController.createProduct);
// Giờ dòng này sẽ chạy ngon lành vì Controller đã có đủ công cụ
router.get('/products', authMiddleware, isAdmin, productController.getAllProducts);

export default router;