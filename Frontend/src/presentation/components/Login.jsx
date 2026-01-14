import React, { useState } from 'react';
import { useAuth } from '../../application/context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import '../../application/styles/Auth.css'; // Import CSS

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await login(email, password);
        if (result.success) {
            navigate('/'); // Chuyển về trang chủ sau khi login
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Đăng Nhập</h2>
                {error && <p style={{color: 'red'}}>{error}</p>}
                
                <div className="form-group">
                    <label>Email</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Mật khẩu</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                
                <button type="submit" className="auth-btn">Đăng nhập</button>
                
                <Link to="/register" className="auth-link">
                    Chưa có tài khoản? <span>Đăng ký ngay</span>
                </Link>
            </form>
        </div>
    );
};

export default Login;