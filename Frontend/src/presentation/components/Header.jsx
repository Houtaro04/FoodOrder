import React from 'react';
import { useCart } from '../../application/context/CartContext';
import { useAuth } from '../../application/context/AuthContext'; // Import Auth
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const { cartItems } = useCart();
  const { user, logout } = useAuth(); // Lấy user và hàm logout
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header-wrapper">
      <div className="header-container">
        <h2 className="header-logo"><Link to="/" style={{color: 'inherit', textDecoration:'none'}}>Food Order</Link></h2>
        
        <nav className="header-nav">
          <Link to="/" className="nav-link">Trang chủ</Link>
          <Link to="/cart" className="nav-link cart-btn">
            <span>Giỏ hàng ({cartItems.length})</span>
          </Link>

          {/* Logic hiển thị theo trạng thái đăng nhập */}
          {user ? (
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              <span style={{ color: '#ffc107', fontWeight: 'bold' }}>
                Chào, {user.fullName}
              </span>
              <button 
                onClick={handleLogout} 
                className="nav-link" 
                style={{ background: 'transparent', border: '1px solid #fff', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <Link to="/login" className="nav-link">Đăng nhập</Link>
          )}

        </nav>
      </div>
    </header>
  );
};

export default Header;