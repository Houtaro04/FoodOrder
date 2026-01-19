import React, { useState, useEffect } from 'react';
import '../../application/styles/Admin.css'; 
import { useAuth } from '../../application/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState('orders');
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    
    // --- 1. KHAI BÁO STATE CHO FORM (Sửa lại cho chuẩn) ---
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    // Category mặc định là 'food' (không để mảng rỗng [])
    const [category, setCategory] = useState('food'); 

    const { logout } = useAuth();
    const navigate = useNavigate();

    // Hàm lấy Token
    const getToken = () => localStorage.getItem('token');

    // Hàm gọi API có xác thực
    const authFetch = async (url, options = {}) => {
        const token = getToken();
        const res = await fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            }
        });
        if (res.status === 401 || res.status === 403) {
            alert("Phiên đăng nhập hết hạn hoặc không có quyền!");
            logout();
            navigate('/admin/login');
            return null;
        }
        return res;
    };

    useEffect(() => {
        if (activeTab === 'orders') fetchOrders();
        if (activeTab === 'users') fetchUsers(); 
    }, [activeTab]);

    const fetchOrders = async () => {
        const res = await authFetch('http://localhost:5000/api/admin/orders');
        if (res && res.ok) {
            const data = await res.json();
            setOrders(data);
        }
    };

    const fetchUsers = async () => {
        const res = await authFetch('http://localhost:5000/api/admin/users');
        if (res && res.ok) {
            const data = await res.json();
            setUsers(data);
        }
    };

    const handleUpdateStatus = async (orderId, newStatus) => {
        await authFetch(`http://localhost:5000/api/admin/orders/${orderId}`, {
            method: 'PUT',
            body: JSON.stringify({ status: newStatus })
        });
        fetchOrders(); 
    };

    // --- 2. SỬA HÀM THÊM MÓN ---
    const handleAddProduct = async (e) => {
        e.preventDefault();
        
        // Gom dữ liệu từ các state lẻ vào object
        const newProduct = {
            name: name,
            price: parseFloat(price), // Chuyển chuỗi sang số
            image: image,
            description: description,
            category: category
        };

        const res = await authFetch('http://localhost:5000/api/admin/products', {
            method: 'POST',
            body: JSON.stringify(newProduct) // Gửi đúng biến newProduct
        });

        if (res && res.ok) {
            alert("Thêm món thành công!");
            // Reset form sau khi thêm (Tuỳ chọn)
            setName('');
            setPrice('');
            setImage('');
            setDescription('');
        }
    };

    return (
        <div className="admin-container">
            <div className="sidebar">
                <h2>Quản lý</h2>
                <ul>
                    <li onClick={() => setActiveTab('orders')} className={activeTab === 'orders' ? 'active' : ''}>Quản lý Đơn hàng</li>
                    <li onClick={() => setActiveTab('products')} className={activeTab === 'products' ? 'active' : ''}>Thêm Món ăn</li>
                    <li onClick={() => setActiveTab('users')} className={activeTab === 'users' ? 'active' : ''}>Người dùng</li>
                </ul>
            </div>

            <div className="admin-content">
                {/* --- TAB ĐƠN HÀNG --- */}
                {activeTab === 'orders' && (
                    <div>
                        <h3>Quản lý Đơn hàng</h3>
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Khách</th>
                                    <th>Tổng tiền</th>
                                    <th>Trạng thái</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(orders) && orders.map(order => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.user?.fullName || 'Ẩn danh'}</td>
                                        <td>{order.totalPrice?.toLocaleString()} đ</td>
                                        <td>
                                            <span className={`status-badge ${order.status}`}>{order.status}</span>
                                        </td>
                                        <td>
                                            {order.status === 'pending' && <button onClick={() => handleUpdateStatus(order._id, 'confirmed')}>Xác nhận</button>}
                                            {order.status === 'confirmed' && <button onClick={() => handleUpdateStatus(order._id, 'shipping')}>Giao hàng</button>}
                                            {order.status === 'shipping' && <button onClick={() => handleUpdateStatus(order._id, 'delivered')}>Hoàn tất</button>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* --- TAB SẢN PHẨM (ĐÃ SỬA) --- */}
                {activeTab === 'products' && (
                    <div>
                        <h3 style={{marginBottom: '20px', borderBottom: '2px solid #ffc107', display: 'inline-block', paddingBottom: '5px'}}>
                            Thêm Món Ăn Mới
                        </h3>
                        
                        <div className="add-product-container">
                            <form onSubmit={handleAddProduct}>
                                
                                {/* Tên món */}
                                <div className="form-group">
                                    <label>Tên món ăn:</label>
                                    <input 
                                        className="input-admin"
                                        placeholder="Ví dụ: Phở bò đặc biệt..." 
                                        value={name} // Gán giá trị
                                        onChange={e => setName(e.target.value)} // Cập nhật đúng biến state lẻ
                                        required 
                                    />
                                </div>

                                {/* Giá và Link Ảnh */}
                                <div style={{display: 'flex', gap: '20px'}}>
                                    <div className="form-group" style={{flex: 1}}>
                                        <label>Giá tiền (VNĐ):</label>
                                        <input 
                                            className="input-admin"
                                            placeholder="50000" 
                                            type="number" 
                                            value={price}
                                            onChange={e => setPrice(e.target.value)} // Cập nhật đúng biến
                                            required 
                                        />
                                    </div>
                                    <div className="form-group" style={{flex: 1}}>
                                        <label>Link hình ảnh (URL):</label>
                                        <input 
                                            className="input-admin"
                                            placeholder="https://..." 
                                            value={image}
                                            onChange={e => setImage(e.target.value)} // Cập nhật đúng biến
                                            required 
                                        />
                                    </div>
                                </div>

                                {/* Danh mục món ăn */}
                                <div className="form-group" style={{ marginBottom: '15px' }}>
                                    <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>
                                        Danh mục món ăn:
                                    </label>
                                    <select 
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                                    >
                                        <option value="food">Đồ ăn</option>
                                        <option value="drink">Đồ uống</option>
                                        <option value="dessert">Tráng miệng</option>
                                        <option value="other">Khác</option>
                                    </select>
                                </div>

                                {/* Mô tả */}
                                <div className="form-group">
                                    <label>Mô tả chi tiết:</label>
                                    <textarea 
                                        className="input-admin"
                                        placeholder="Mô tả thành phần, hương vị..." 
                                        value={description}
                                        onChange={e => setDescription(e.target.value)} // Cập nhật đúng biến
                                    />
                                </div>

                                <button className="btn-submit">
                                    <i className="fa-solid fa-plus" style={{marginRight: '8px'}}></i>
                                    Thêm Vào Menu
                                </button>

                            </form>
                        </div>
                    </div>
                )}

                {/* --- TAB USER --- */}
                {activeTab === 'users' && (
                    <div>
                        <h3>Danh sách Người dùng</h3>
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Họ và Tên</th>
                                    <th>Email</th>
                                    <th>Quyền</th>
                                    <th>SĐT</th>
                                    <th>Địa chỉ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users && users.length > 0 ? (
                                    users.map((user, index) => (
                                        <tr key={user._id || index}> 
                                            <td title={user._id || user.id}>
                                                {(user._id || user.id) ? (user._id || user.id).toString().slice(-6) : 'N/A'}
                                            </td> 
                                            <td style={{fontWeight: 'bold'}}>{user.fullName || 'Không tên'}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                <span style={{
                                                    color: user.role === 'admin' ? 'red' : 'green',
                                                    fontWeight: 'bold',
                                                    textTransform: 'uppercase'
                                                }}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td>{user.phone || '---'}</td>
                                            <td>{user.address || '---'}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" style={{textAlign: "center", padding: "20px"}}>
                                            Chưa có người dùng nào
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPage;