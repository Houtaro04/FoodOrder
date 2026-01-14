import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  fullName: { 
    type: String, 
    required: true 
  },
  username: { 
    type: String, 
    required: true, 
    unique: true // Tên đăng nhập không được trùng
  },
  password: { 
    type: String, 
    required: true 
    // LƯU Ý: Ở đây sẽ lưu chuỗi mã hóa (Hash), KHÔNG lưu password thô
  },
  role: { 
    type: String, 
    enum: ['customer', 'admin'], // Chỉ chấp nhận 2 giá trị này
    default: 'customer' 
  },
  phone: { 
    type: String,
    required: true
  },
  address: { 
    type: String,
    default: '' // Địa chỉ mặc định để ship hàng
  }
}, {
  timestamps: true
});

UserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password; // CỰC KỲ QUAN TRỌNG: Không bao giờ trả về password khi query
  }
});

const UserModel = mongoose.model('User', UserSchema);
export default UserModel;