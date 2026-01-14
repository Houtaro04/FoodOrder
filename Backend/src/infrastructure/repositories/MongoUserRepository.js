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
      mongoUser.role,
      mongoUser.phone,
      mongoUser.address
    );
  }

  async findByUsername(username) {
    const mongoUser = await UserModel.findOne({ username });
    // Trả về Entity sạch, không dính dáng gì tới hàm của mongoose
    return this._toEntity(mongoUser);
  }

  async create(userEntity) {
    // Chuyển từ Entity -> Mongoose Model để lưu
    const userModel = new UserModel({
      fullName: userEntity.fullName,
      username: userEntity.username,
      password: userEntity.password,
      role: userEntity.role,
      phone: userEntity.phone,
      address: userEntity.address
    });
    
    await userModel.save();
    return this._toEntity(userModel);
  }
}