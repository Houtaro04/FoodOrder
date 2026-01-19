export default class GetAllProductUseCase {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }

    async execute() {
        // Gọi hàm getAll bên Repository
        return await this.productRepository.getAll();
    }
}