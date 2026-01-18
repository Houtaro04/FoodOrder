import { UserRepository } from "../../domain/repositories/UserRepository.js";
import UserModel from "../database/models/UserModel.js"; 
import { User } from "../../domain/entities/User.js"; // Import Entity

export class MongoUserRepository extends UserRepository {
  
  // Hàm phụ trợ: Chuyển từ Mongoose Object -> Domain Entity
  // Đây được gọi là "Mapper"
  _toEntity(mongoUser) {
    if (!mongoUser) return null;
    return new User(
      mongoUser._id.toString(),
      mongoUser.fullName,
      mongoUser.username,
      mongoUser.password,
      mongoUser.email,
      mongoUser.role,
      mongoUser.phone,
      mongoUser.address
    );
  }

  async findByEmail(email) {
    const mongoUser = await UserModel.findOne({ email });
    if (!mongoUser) return null;
    return new User(
      mongoUser._id.toString(),
      mongoUser.fullName,
      mongoUser.username,
      mongoUser.password,
      mongoUser.email,
      mongoUser.role,
      mongoUser.phone,
      mongoUser.address
    );
  }

  async create(userEntity) {
    // Chuyển từ Entity -> Mongoose Model để lưu
    const userModel = new UserModel({
      id: userEntity.id,
      fullName: userEntity.fullName,
      username: userEntity.username,
      password: userEntity.password,
      email: userEntity.email,
      role: userEntity.role,
      phone: userEntity.phone,
      address: userEntity.address
    });
    
    await userModel.save();
    return this._toEntity(userModel);
  }
  async getAllUsers() {
        // Lấy tất cả user, trừ password ra cho bảo mật
        // sort({ createdAt: -1 }) để user mới nhất lên đầu
        return await UserModel.find().select('-password').sort({ createdAt: -1 });
    }
}