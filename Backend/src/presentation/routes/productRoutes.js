import express from 'express';
import ProductController from '../controllers/ProductController.js';
import { MongoProductRepository } from '../../infrastructure/repositories/MongoProductRepository.js';
import GetAllProductUseCase from '../../application/product/GetAllProduct.usecases.js'; 

const router = express.Router();

// --- PHẦN WIRING (LẮP RÁP) ---
const productRepository = new MongoProductRepository();
const getAllProductUseCase = new GetAllProductUseCase(productRepository);
const productController = new ProductController(null, getAllProductUseCase);

// --- ROUTES ---
router.get('/', productController.getAllProducts);

export default router;