import bcrypt from 'bcrypt';

export class LoginUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(email, password) {
    // 1. Tìm user trong DB
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Sai tên đăng nhập hoặc mật khẩu');
    }

    // 2. So sánh password nhập vào với password đã mã hóa trong DB
    // bcrypt.compare(passwordThô, passwordMãHóa)
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      throw new Error('Sai tên đăng nhập hoặc mật khẩu');
    }

    // 3. Trả về thông tin user (để Controller tạo Token sau)
    return user;
  }
}