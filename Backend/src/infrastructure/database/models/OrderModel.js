import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Liên kết với bảng User
    required: true
  },
  items: [
    {
      productId: {
        type: String, 
        required: true
      },
      productName: String, 
      quantity: {
        type: Number,
        required: true,
        min: 1
      },
      price: {
        type: Number, // Giá tại thời điểm mua
        required: true
      }
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  shippingInfo: {
    address: { type: String, required: true },
    note: { type: String, default: '' }
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'banking'],
    default: 'cash'
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'delivering', 'completed', 'cancelled'],
    default: 'pending'
  }
}, {
  timestamps: true 
});

// Chuyển _id thành id cho đẹp khi trả về JSON
OrderSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const OrderModel = mongoose.model('Order', OrderSchema);
export default OrderModel;