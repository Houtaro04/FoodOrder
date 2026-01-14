export class GetAllProductsUsecase {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async execute() {
        // Lấy tất cả sản phẩm có trạng thái 'available'.
        // Việc lọc dữ liệu nên được thực hiện ở tầng cơ sở dữ liệu để tối ưu hiệu năng,
        // thay vì lấy tất cả sản phẩm về rồi lọc ở tầng ứng dụng.
        // Repository nên cung cấp một phương thức cho phép truy vấn theo điều kiện.
        const products = await this.productRepository.find({ status: 'available' });
        return products;
    }
}