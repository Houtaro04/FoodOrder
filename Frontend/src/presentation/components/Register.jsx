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
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            return setError("Mật khẩu xác nhận không khớp!");
        }

        const result = await register(formData.name, formData.email, formData.password);
        if (result.success) {
            alert("Đăng ký thành công! Vui lòng đăng nhập.");
            navigate('/login');
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Đăng Ký</h2>
                {error && <p style={{color: 'red'}}>{error}</p>}

                <div className="form-group">
                    <label>Họ tên</label>
                    <input name="name" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input name="email" type="email" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Mật khẩu</label>
                    <input name="password" type="password" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Nhập lại mật khẩu</label>
                    <input name="confirmPassword" type="password" onChange={handleChange} required />
                </div>

                <button type="submit" className="auth-btn">Đăng ký</button>

                <Link to="/login" className="auth-link">
                    Đã có tài khoản? <span>Đăng nhập</span>
                </Link>
            </form>
        </div>
    );
};

export default Register;