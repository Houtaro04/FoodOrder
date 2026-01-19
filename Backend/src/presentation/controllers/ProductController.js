// src/presentation/controllers/ProductController.js

export default class ProductController {
    
    // Constructor nhận vào 2 UseCase (từ Route truyền vào)
    constructor(addNewProductUseCase, getAllProductUseCase) {
        this.addNewProductUseCase = addNewProductUseCase;
        this.getAllProductUseCase = getAllProductUseCase;
    }

    // --- Hàm 1: Lấy danh sách món (Dùng cho cả Admin và Khách) ---
    getAllProducts = async (req, res) => {
        try {
            // Guard clause: Kiểm tra xem UseCase đã được truyền vào chưa
            if (!this.getAllProductUseCase) {
                throw new Error("Lỗi: getAllProductUseCase chưa được khởi tạo!");
            }

            const products = await this.getAllProductUseCase.execute();
            return res.status(200).json(products);
        } catch (error) {
            console.error("Lỗi lấy danh sách món:", error);
            return res.status(500).json({ error: error.message });
        }
    }

    // --- Hàm 2: Thêm món mới (Chỉ dùng cho Admin) ---
    createProduct = async (req, res) => {
        try {
            // Guard clause
            if (!this.addNewProductUseCase) {
                throw new Error("Lỗi: addNewProductUseCase chưa được khởi tạo!");
            }

            const productData = req.body;

            // Validate cơ bản
            if (!productData.name || !productData.price) {
                return res.status(400).json({ error: "Tên món và giá tiền là bắt buộc" });
            }

            const newProduct = await this.addNewProductUseCase.execute(productData);
            
            return res.status(201).json({
                message: "Thêm món thành công",
                data: newProduct
            });
        } catch (error) {
            console.error("Lỗi thêm món:", error);
            return res.status(500).json({ error: error.message });
        }
    }
}