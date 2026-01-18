import { useEffect, useState } from 'react';
import { productApi } from '../../infrastructure/api/productApi';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productApi.getAll();
        setProducts(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy món ăn:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>🍽️ Menu</h2>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;