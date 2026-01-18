import React from 'react';
import { useAuth } from '../../application/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminHeader = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    return (
        <div style={{
            backgroundColor: '#222', 
            color: '#fff', 
            padding: '10px 20px', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            borderBottom: '2px solid #ffc107'
        }}>
            <h3 style={{margin: 0, color: '#ffc107'}}>Food Order ADMIN</h3>
            <div style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
                <span style={{ color: '#ffc107', fontWeight: 'bold' }}>
                    Chào, ADMIN
                </span>
                <button 
                    onClick={handleLogout}
                    style={{
                        padding: '5px 10px', 
                        backgroundColor: 'red', 
                        color: 'white',  
                        borderRadius: '10px',
                        cursor: 'pointer'
                    }}
                >
                    Đăng xuất
                </button>
            </div>
        </div>
    );
};

export default AdminHeader;