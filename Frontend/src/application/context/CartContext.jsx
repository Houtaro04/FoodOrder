import { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Hàm thêm vào giỏ
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        // Nếu món đã có, tăng số lượng
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // Nếu chưa có, thêm mới với số lượng 1
      return [...prev, { ...product, quantity: 1 }];
    });
    alert(`Đã thêm ${product.name} vào giỏ!`);
  };

  // Hàm tính tổng tiền
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, totalAmount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);