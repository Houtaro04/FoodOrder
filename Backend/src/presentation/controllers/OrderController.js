export default class OrderController {
  // 1. Inject cả UseCase (cho user tạo đơn) và Repository (cho admin quản lý)
  constructor(createOrderUseCase, orderRepository) {
    this.createOrderUseCase = createOrderUseCase;
    this.orderRepository = orderRepository;
  }

  // --- 1. TẠO ĐƠN HÀNG (User) ---
  create = async (req, res) => {
    try {
      if (!req.user || !req.user.id) {
        return res.status(401).json({ error: "Unauthorized: User not found" });
      }

      const customerId = req.user.id;
      const orderData = req.body;

      if (!orderData.items || orderData.items.length === 0) {
        return res.status(400).json({ error: "Giỏ hàng không được để trống" });
      }

      const createdOrder = await this.createOrderUseCase.execute(customerId, orderData);
      
      return res.status(201).json({ 
        message: "Đặt hàng thành công", 
        data: createdOrder 
      });

    } catch (error) {
      console.error("Error creating order:", error);
      return res.status(400).json({ error: error.message });
    }
  }

  // --- 2. LẤY TẤT CẢ ĐƠN (Admin) ---
  getAllOrders = async (req, res) => {
      try {
          // KHÔNG dùng require ở đây. Dùng Repository đã inject.
          const orders = await this.orderRepository.getAllOrders();
          res.status(200).json(orders);
      } catch (error) {
          res.status(500).json({ error: error.message });
      }
  }

  // --- 3. CẬP NHẬT TRẠNG THÁI (Admin) ---
  updateOrderStatus = async (req, res) => {
      try {
          const { id } = req.params;
          const { status } = req.body; 

          // Gọi Repository để update
          const updatedOrder = await this.orderRepository.updateStatus(id, status);
          
          if (!updatedOrder) {
            return res.status(404).json({ error: "Không tìm thấy đơn hàng" });
          }

          res.status(200).json(updatedOrder);
      } catch (error) {
          res.status(500).json({ error: error.message });
      }
  }
}