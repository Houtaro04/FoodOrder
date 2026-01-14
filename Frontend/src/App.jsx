import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './application/context/CartContext';
import Header from './presentation/components/Header';
import HomePage from './presentation/pages/HomePage';
import Login from './presentation/components/Login';
import Register from './presentation/components/Register';

function App() {
  return (
    <CartProvider> {/* Cung cấp Context giỏ hàng cho toàn bộ app */}
      <Router>
        <Header />
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;