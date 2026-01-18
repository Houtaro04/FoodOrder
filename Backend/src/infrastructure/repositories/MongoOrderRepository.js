import { OrderRepository } from "../../domain/repositories/OrderRepository.js";
import OrderModel from "../database/models/OrderModel.js";

export class MongoOrderRepository extends OrderRepository {
  async create(orderEntity) {
    const newOrder = new OrderModel(orderEntity);
    await newOrder.save();
    return newOrder;
  }
  // Thêm hàm lấy tất cả đơn (cho Admin)
    async getAllOrders() {
        // Logic lấy dữ liệu và populate user
        return await OrderModel.find()
            .populate('user', 'fullName email') // Lấy thông tin user
            .sort({ createdAt: -1 }); // Mới nhất lên đầu
    }

    // Thêm hàm update status (cho Admin)
    async updateStatus(orderId, newStatus) {
        return await OrderModel.findByIdAndUpdate(
            orderId, 
            { status: newStatus }, 
            { new: true } // Trả về data mới sau khi update
        );
    }
}