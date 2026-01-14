// src/domain/entities/User.js
export class User {
  constructor(id, fullName, username, password, role, phone, address) {
    this.id = id;
    this.fullName = fullName;
    this.username = username;
    this.password = password;
    this.role = role;
    this.phone = phone;
    this.address = address;
  }

  // LOGIC NGHIỆP VỤ nằm ở đây
  isAdmin() {
    return this.role === 'admin';
  }

  // Ví dụ: Logic kiểm tra xem user có đủ điều kiện đặt hàng không
  canOrder() {
    return !!this.phone && !!this.address; // Phải có sđt và địa chỉ mới được đặt
  }
}