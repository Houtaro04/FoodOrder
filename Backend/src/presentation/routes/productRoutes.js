// src/presentation/routes/productRoutes.js
import express from 'express';
import productController from '../controllers/ProductController.js';
const router = express.Router();

// Định nghĩa GET / (Tương ứng với /api/products bên server.js)
router.get('/', productController.getAllProducts); 
// (Chú ý: tên hàm getAllProducts phải khớp với tên trong Controller)

export default router;