// Import Interface (để đảm bảo tuân thủ hợp đồng)
import { ProductRepository } from "../../domain/repositories/ProductRepository.js";
import ProductModel from "../database/models/ProductModel.js";

export class MongoProductRepository extends ProductRepository {
  
  async create(productData) {
    const product = new ProductModel(productData);
    return await product.save();
  }

  async getAll() {
    // Chỉ lấy những món đang bán (isAvailable: true) cho khách xem
    return await ProductModel.find({ isAvailable: true });
  }

  // Dành cho Admin
  async getAllForAdmin() {
    return await ProductModel.find({});
  }

  async findById(id) {
    return await ProductModel.findById(id);
  }
}