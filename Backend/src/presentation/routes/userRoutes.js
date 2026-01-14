import express from 'express';
import { UserController } from '../controllers/UserController.js';
import { RegisterUserUseCase } from '../../application/user/RegisterUser.usecase.js';
import { LoginUserUseCase } from '../../application/user/LoginUser.usecase.js';
import { MongoUserRepository } from '../../infrastructure/repositories/MongoUserRepository.js';

const router = express.Router();

// --- Wiring (Kết nối dây điện) ---
// Khởi tạo các lớp từ trong ra ngoài
const userRepository = new MongoUserRepository();
const registerUseCase = new RegisterUserUseCase(userRepository);
const loginUseCase = new LoginUserUseCase(userRepository);
const userController = new UserController(registerUseCase, loginUseCase);

// --- Routes ---
router.post('/register', userController.register);
router.post('/login', userController.login);

export default router;