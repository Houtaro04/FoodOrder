// src/presentation/controllers/ProductController.js

// Import UseCase (nếu có, nhớ thêm đuôi .js)
// import getAllProductUseCase from '...'; 

class ProductController {
    // Constructor (nếu cần)
    constructor() {
        // this.getAllProductUseCase = ...
    }

    // Chuyển các hàm về dạng arrow function để không bị lỗi 'this'
    getAllProducts = async (req, res) => {
        try {
            // Logic lấy sản phẩm...
            // const products = await this.getAllProductUseCase.execute(); 
            // Demo tạm:
            res.status(200).json([{ id: 1, name: "Pizza Demo" }]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    createProduct = async (req, res) => {
        try {
            console.log("Body:", req.body);
            res.status(201).json({ message: "Tạo thành công" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

// --- QUAN TRỌNG: Xuất ra instance của class ---
export default new ProductController();