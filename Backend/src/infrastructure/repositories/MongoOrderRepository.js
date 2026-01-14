import { OrderRepository } from "../../domain/repositories/OrderRepository.js";
import OrderModel from "../database/models/OrderModel.js";

export class MongoOrderRepository extends OrderRepository {
  async create(orderEntity) {
    const newOrder = new OrderModel(orderEntity);
    await newOrder.save();
    return newOrder;
  }
  async findById(id) {
    return await OrderModel.findById(id);
  }
  async updateStatus(id, status) {
    return await OrderModel.findByIdAndUpdate(id, { status }, { new: true });
  }
  async getAll() {
    return await OrderModel.find({});
  }
}