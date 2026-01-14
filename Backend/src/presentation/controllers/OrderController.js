export class OrderController {
  constructor(createOrderUseCase) {
    this.createOrderUseCase = createOrderUseCase;
  }

  // SỬA 1: Dùng Arrow Function để giữ ngữ cảnh 'this'
  create = async (req, res) => {
    try {
      // SỬA 2: Kiểm tra an toàn (Safety check)
      // Đảm bảo middleware auth đã chạy và user đã đăng nhập
      if (!req.user || !req.user.id) {
        return res.status(401).json({ error: "Unauthorized: User not found" });
      }

      const customerId = req.user.id;
      const orderData = req.body;

      // SỬA 3: Validate cơ bản ở tầng Controller
      // (Ví dụ: Giỏ hàng không được rỗng)
      if (!orderData.items || orderData.items.length === 0) {
        return res.status(400).json({ error: "Giỏ hàng không được để trống" });
      }

      // Gọi Use Case
      const createdOrder = await this.createOrderUseCase.execute(customerId, orderData);
      
      return res.status(201).json({ 
        message: "Đặt hàng thành công", 
        data: createdOrder 
      });

    } catch (error) {
      // SỬA 4: Log lỗi ra terminal để dev xem
      console.error("Error creating order:", error);

      // Trả về lỗi cho client
      // Nếu lỗi từ UseCase (ví dụ: hết hàng), trả về 400. Lỗi hệ thống trả về 500.
      return res.status(400).json({ error: error.message });
    }
  }
}