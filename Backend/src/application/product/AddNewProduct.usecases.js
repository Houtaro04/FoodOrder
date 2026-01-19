export default class AddNewProductUsecase {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async execute(productData) {
        const product = await this.productRepository.create(productData);
        return product;
    }
}