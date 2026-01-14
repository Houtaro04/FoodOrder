import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  description: { 
    type: String 
  },
  image: { 
    type: String, // Lưu URL ảnh (ví dụ: link Cloudinary hoặc đường dẫn file local)
    default: 'default-food.png' 
  },
  category: {
    type: String, // Ví dụ: 'Đồ uống', 'Đồ ăn nhanh'
    required: true
  },
  isAvailable: { 
    type: Boolean, 
    default: true // Admin có thể tắt món này nếu hết nguyên liệu
  }
}, {
  timestamps: true // Tự động tạo field createdAt và updatedAt
});

// Convert _id to id khi trả về JSON (Clean Architecture thích dùng 'id' hơn '_id')
ProductSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const ProductModel = mongoose.model('Product', ProductSchema);
export default ProductModel;