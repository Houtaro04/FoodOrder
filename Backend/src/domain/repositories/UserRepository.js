export class UserRepository {
  // Định nghĩa các hành động bắt buộc phải có
  
  create(user) {
    throw new Error("Method 'create' not implemented");
  }

  findByUsername(username) {
    throw new Error("Method 'findByUsername' not implemented");
  }

  findById(id) {
    throw new Error("Method 'findById' not implemented");
  }
}