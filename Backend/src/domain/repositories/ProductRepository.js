export class ProductRepository {
    // Định nghĩa các hành động bắt buộc phải có
    create(product) {
        throw new Error("Method 'create' not implemented");
    }
    getAll() {
        throw new Error("Method 'getAll' not implemented");
    }
    findById(id) {
        throw new Error("Method 'findById' not implemented");
    }
}