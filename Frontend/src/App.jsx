import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './application/context/AuthContext';
import { CartProvider } from './application/context/CartContext';

// Import các component
import Login from './presentation/components/Login';
import Register from './presentation/components/Register';
import AdminLogin from './presentation/pages/AdminLogin';
import Header from './presentation/components/Header';
import HomePage from './presentation/pages/HomePage';
import AdminPage from './presentation/pages/AdminPage';
import AdminHeader from './presentation/components/AdminHeader'; // 1. Import Header Admin mới tạo

// Import bảo vệ
import { PrivateRoute, AdminRoute } from './presentation/components/PrivateRouter';

const AppContent = () => {
  const location = useLocation(); 

  // --- LOGIC ẨN/HIỆN HEADER ---

  // 2. Danh sách các trang KHÔNG ĐƯỢC hiện Header chính (Header khách hàng)
  // Mình đã thêm '/admin/dashboard' vào đây để giấu Header chính đi khi vào Admin
  const hideMainHeaderPaths = ['/login', '/register', '/admin/login', '/admin/dashboard'];

  // Kiểm tra: Có hiện Header chính hay không?
  const showMainHeader = !hideMainHeaderPaths.includes(location.pathname);

  // 3. Kiểm tra: Có hiện Admin Header hay không?
  // Chỉ hiện khi đường dẫn bắt đầu bằng /admin/dashboard
  const showAdminHeader = location.pathname.startsWith('/admin/dashboard');

  return (
    <>
      {/* A. Header dành riêng cho Admin */}
      {showAdminHeader && <AdminHeader />}

      {/* B. Header dành cho Khách hàng (Main Header) */}
      {showMainHeader && <Header />}
      
      <Routes>
        {/* --- 1. NHÓM TRANG CÔNG KHAI --- */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Trang Admin Login (Không có header nào) */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* --- 2. NHÓM TRANG USER --- */}
        <Route 
          path="/" 
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          } 
        />
        
        <Route 
          path="/cart" 
          element={
            <PrivateRoute>
               {/* Component giỏ hàng của bạn */}
               <div>Trang giỏ hàng</div> 
            </PrivateRoute>
          } 
        />

        {/* --- 3. NHÓM TRANG ADMIN --- */}
        <Route 
          path="/admin/dashboard" 
          element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          } 
        />
        
        {/* Bắt link sai */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
         <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;