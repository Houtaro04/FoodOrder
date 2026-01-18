// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../application/context/AuthContext';

// Dành cho User thường (Login rồi mới được vào)
export const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Đang tải...</div>; // Tránh flash màn hình

  // Nếu chưa đăng nhập -> Đá về trang user login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Dành riêng cho Admin (Phải là Admin mới được vào)
export const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Đang tải...</div>;

  // Nếu chưa đăng nhập -> Đá về trang admin login
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  // Nếu đã đăng nhập nhưng không phải admin -> Đá về trang chủ user
  if (user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};