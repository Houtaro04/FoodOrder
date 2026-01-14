import jwt from 'jsonwebtoken';

export class UserController {
  constructor(registerUserUseCase, loginUserUseCase) {
    this.registerUserUseCase = registerUserUseCase;
    this.loginUserUseCase = loginUserUseCase;
  }

  // --- Đăng Ký ---
  register = async (req, res) => {
    try {
      const { fullName, username, password, phone, address } = req.body;
      
      // Validate cơ bản
      if (!username || !password || !fullName) {
        return res.status(400).json({ error: "Thiếu thông tin bắt buộc" });
      }

      const createdUser = await this.registerUserUseCase.execute({ 
        fullName, username, password, phone, address 
      });

      res.status(201).json({ 
        message: "Đăng ký thành công", 
        user: { id: createdUser.id, username: createdUser.username } // Không trả về password
      });

    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // --- Đăng Nhập ---
  login = async (req, res) => {
    try {
      const { username, password } = req.body;

      // 1. Gọi Use Case để kiểm tra đăng nhập
      const user = await this.loginUserUseCase.execute(username, password);

      // 2. Tạo JWT Token (Thẻ bài)
      // Token này chứa id và role của user, hết hạn sau 1 ngày
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET || 'secret_key_tam_thoi', // Lấy từ .env
        { expiresIn: '1d' }
      );

      res.status(200).json({
        message: "Đăng nhập thành công",
        token: token,
        user: {
          id: user.id,
          fullName: user.fullName,
          role: user.role
        }
      });

    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
}