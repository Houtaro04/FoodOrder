import React, { useState } from 'react';
import { useAuth } from '../../application/context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import '../../application/styles/Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      return setError('Mật khẩu xác nhận không khớp!');
    }

    setIsLoading(true);
    const result = await register(formData.name, formData.email, formData.password);
    
    if (result.success) {
      alert('Đăng ký thành công! Hãy đăng nhập ngay.');
      navigate('/login');
    } else {
      setError(result.message || 'Đăng ký thất bại.');
    }
    setIsLoading(false);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <h2 className="auth-title">Đăng Ký</h2>
        
        {error && <div className="auth-error">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Họ tên</label>
            <input 
              name="name"
              className="form-input"
              onChange={handleChange}
              placeholder="Nguyễn Văn A"
              required 
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input 
              type="email"
              name="email"
              className="form-input"
              onChange={handleChange}
              placeholder="email@example.com"
              required 
            />
          </div>

          <div className="form-group">
            <label>Mật khẩu</label>
            <input 
              type="password"
              name="password"
              className="form-input"
              onChange={handleChange}
              placeholder="******"
              required 
            />
          </div>

          <div className="form-group">
            <label>Nhập lại mật khẩu</label>
            <input 
              type="password"
              name="confirmPassword"
              className="form-input"
              onChange={handleChange}
              placeholder="******"
              required 
            />
          </div>

          <button type="submit" className="btn-submit" disabled={isLoading}>
             {isLoading ? 'Đang tạo...' : 'Đăng Ký'}
          </button>
        </form>

        <p className="auth-redirect">
          Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;