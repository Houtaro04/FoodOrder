import jwt from 'jsonwebtoken';

export class UserController {
  constructor(registerUserUseCase, loginUserUseCase) {
    this.registerUserUseCase = registerUserUseCase;
    this.loginUserUseCase = loginUserUseCase;
  }

  // --- Đăng Ký ---
  register = async (req, res) => {
    try {
        // 1. Lấy dữ liệu tên kiểu Frontend gửi lên
        const { name, email, password } = req.body;

        console.log("Debug Frontend gửi:", req.body); // Check log xem nhận được chưa

        // 2. Map (Chuyển đổi) sang tên biến mà User.js (Entity) cần
        const userData = {
            fullName: name,           // Frontend gửi 'name' -> Backend lưu vào 'fullName'
            username: email.split('@')[0], // Tự tạo username từ phần đầu email
            password: password,
            email: email,              // Frontend gửi 'email' -> Backend lưu vào 'mail'
            role: 'customer',             // Mặc định là user thường
            phone: '',                // Để trống nếu frontend chưa gửi
            address: ''               // Để trống nếu frontend chưa gửi
        };

        // 3. Gọi UseCase thực thi (truyền userData đã chuẩn hóa vào)
        const newUser = await this.registerUserUseCase.execute(userData);
        
        // ... Code trả về response ...
        return res.status(200).json(newUser);

    } catch (error) {
        // ... Code xử lý lỗi ...
        return res.status(400).json({ error: error.message });
    }
  }


  // --- Đăng Nhập ---
  login = async (req, res) => {
    try {
        // 1. Chỉ nhận Email và Password (theo đúng form frontend)
        const { email, password } = req.body;

        // Validation cơ bản: Nếu thiếu 1 trong 2 thì báo lỗi luôn
        if (!email || !password) {
            return res.status(400).json({ error: "Vui lòng nhập email và mật khẩu!" });
        }

        // 2. Gọi Use Case (Chỉ cần truyền email và password)
        // Lưu ý: Bên trong UseCase này bạn phải tự so sánh password hash nhé
        const user = await this.loginUserUseCase.execute(email, password);

        // Kiểm tra nếu UseCase không trả về user (tức là sai email/pass)
        if (!user) {
            throw new Error("Email hoặc mật khẩu không đúng");
        }

        // 3. Tạo Token
        const token = jwt.sign(
            { id: user.id, role: user.role }, // Payload
            process.env.JWT_SECRET || 'secret_key_tam_thoi',
            { expiresIn: '1d' }
        );

        // 4. Trả về kết quả
        res.status(200).json({
            message: "Đăng nhập thành công",
            token: token,
            user: {
                id: user.id,
                // Lưu ý: Kiểm tra kỹ xem user trả về dùng 'fullName' hay 'name'
                // Dựa theo file User.js bạn gửi lúc nãy thì là fullName
                fullName: user.fullName, 
                email: user.mail, // Map lại cho frontend dễ dùng (nếu Entity lưu là mail)
                role: user.role
            }
        });

    } catch (error) {
        // Trả về 401 (Unauthorized) cho lỗi đăng nhập
        res.status(401).json({ error: error.message });
    }
}
}