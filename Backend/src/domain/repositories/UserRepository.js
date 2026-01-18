export class UserRepository {
  // Định nghĩa các hành động bắt buộc phải có
  
  create(user) {
    throw new Error("Method 'create' not implemented");
  }

  findByEmail(email) {
    throw new Error("Method 'findByEmail' not implemented");
  }

  findById(id) {
    throw new Error("Method 'findById' not implemented");
  }
}