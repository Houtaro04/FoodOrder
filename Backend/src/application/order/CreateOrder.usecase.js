export class CreateOrderUseCase {
  constructor(orderRepository, productRepository) {
    this.orderRepository = orderRepository;
    this.productRepository = productRepository;
  }

  async execute(customerId, inputData) {
    // 1. Validate và lấy giá tiền thực tế từ DB (Security check)
    let totalAmount = 0;
    const finalItems = [];

    for (const item of inputData.items) {
      const product = await this.productRepository.findById(item.productId);
      if (!product) throw new Error(`Sản phẩm ${item.productId} không tồn tại`);
      
      const subTotal = product.price * item.quantity;
      totalAmount += subTotal;
      
      finalItems.push({
        productId: product.id,
        productName: product.name, // Lưu tên để lỡ xóa sp thì đơn hàng vẫn còn tên
        price: product.price,
        quantity: item.quantity
      });
    }

    // 2. Tạo Entity Order
    const newOrder = {
      customerId: customerId,
      items: finalItems,
      totalAmount: totalAmount,
      shippingInfo: inputData.shippingInfo,
      paymentMethod: inputData.paymentMethod,
      status: 'pending' // Mặc định là chờ xác nhận
    };

    // 3. Lưu xuống DB
    return await this.orderRepository.create(newOrder);
  }
}