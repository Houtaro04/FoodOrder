import React from 'react';
import { useCart } from '../../application/context/CartContext';
import { Link } from 'react-router-dom';
import './Header.css'; // <--- Đừng quên dòng này để import file CSS vừa tạo

const Header = () => {
  const { cartItems } = useCart();

  return (
    // Wrapper chịu trách nhiệm màu nền full màn hình
    <header className="header-wrapper">
      
      {/* Container chịu trách nhiệm căn giữa nội dung */}
      <div className="header-container">
        
        {/* Logo */}
        <h2 className="header-logo">Food Order</h2>
        
        {/* Menu điều hướng */}
        <nav className="header-nav">
          <Link to="/" className="nav-link">
            Trang chủ
          </Link>
          
          <Link to="/cart" className="nav-link cart-btn">
            {/* Thêm icon giỏ hàng nếu muốn, ví dụ: 🛒 */}
            <span>Giỏ hàng ({cartItems.length})</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;