import bcrypt from 'bcrypt';

export class RegisterUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(userData) {
    // 1. Kiểm tra xem username đã tồn tại chưa
    const existingUser = await this.userRepository.findByUsername(userData.username);
    if (existingUser) {
      throw new Error('Tên đăng nhập đã tồn tại');
    }

    // 2. Mã hóa password (Hashing)
    // saltRounds = 10 là mức độ an toàn tiêu chuẩn
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // 3. Tạo user mới với password đã mã hóa
    const newUser = {
      ...userData,
      password: hashedPassword
    };

    return await this.userRepository.create(newUser);
  }
}