import React, { useState } from 'react';
import { useAuth } from '../../application/context/AuthContext'; // Nhớ đường dẫn file Context của bạn
import { useNavigate } from 'react-router-dom';
import '../../application/styles/Auth.css'; // Tận dụng CSS cũ

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, logout } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const result = await login(email, password);

        if (result.success) {
            // SỬA: Kiểm tra kỹ xem user có tồn tại không trước khi check role
            if (result.user && result.user.role === 'admin') {
                navigate('/admin/dashboard');
            } else {
                setError("Bạn không có quyền truy cập Admin!");
                logout();
            }
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="auth-wrapper" style={{backgroundColor: '#2c3e50'}}> {/* Màu nền tối cho Admin */}
            <div className="auth-box">
                <h2 className="auth-title" style={{color: '#ffc107'}}>ADMIN LOGIN</h2>
                {error && <div className="auth-error">{error}</div>}
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email Quản trị viên</label>
                        <input className="form-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Mật khẩu</label>
                        <input className="form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn-submit" style={{backgroundColor: '#ffc107', color: '#000'}}>
                        Đăng Nhập Admin
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;