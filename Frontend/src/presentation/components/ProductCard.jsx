import { useCart } from '../../application/context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '8px', width: '200px' }}>
      {/* Nếu bạn chưa có ảnh thật thì dùng ảnh placeholder */}
      <img 
        src={product.image || 'https://via.placeholder.com/150'} 
        alt={product.name} 
        style={{ width: '100%', height: '150px', objectFit: 'cover' }} 
      />
      <h3>{product.name}</h3>
      <p className="price">
          {product.price ? product.price.toLocaleString() : 0} VNĐ
      </p>
      <button 
        onClick={() => addToCart(product)}
        style={{ background: '#ff6b6b', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
      >
        Thêm vào giỏ
      </button>
    </div>
  );
};

export default ProductCard;