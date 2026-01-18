import React, { useState, useEffect } from 'react';
import '../../application/styles/Admin.css'; // Đảm bảo bạn có file css này
import { useAuth } from '../../application/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState('orders');
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]); // Thêm state users
    const [products, setProducts] = useState({ name: '', price: '', image: '', description: '' });
    
    const { logout } = useAuth();
    const navigate = useNavigate();

    // Hàm lấy Token từ LocalStorage
    const getToken = () => localStorage.getItem('token');

    // Hàm gọi API chung để đỡ phải viết lại Header nhiều lần
    const authFetch = async (url, options = {}) => {
        const token = getToken();
        const res = await fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // <--- QUAN TRỌNG NHẤT: Gửi kèm Token
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
        if (activeTab === 'users') fetchUsers(); // Gọi hàm lấy user
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

    const handleAddProduct = async (e) => {
        e.preventDefault();
        const res = await authFetch('http://localhost:5000/api/admin/products', {
            method: 'POST',
            body: JSON.stringify(products)
        });
        if (res && res.ok) alert("Thêm món thành công!");
    };

    return (
        <div className="admin-container">
            <div className="sidebar">
                <h2>Quản lý</h2>
                <ul>
                    <li onClick={() => setActiveTab('orders')}>Quản lý Đơn hàng</li>
                    <li onClick={() => setActiveTab('products')}>Thêm Món ăn</li>
                    <li onClick={() => setActiveTab('users')}>Người dùng</li>
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
                                {/* Thêm kiểm tra Array.isArray để tránh lỗi .map is not a function */}
                                {Array.isArray(orders) && orders.map(order => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.user?.fullName || 'Ẩn danh'}</td>
                                        <td>{order.totalPrice?.toLocaleString()} đ</td>
                                        <td>{order.status}</td>
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

                {/* --- TAB SẢN PHẨM (GIAO DIỆN MỚI) --- */}
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
                                        onChange={e => setProducts({...products, name: e.target.value})} 
                                        required 
                                    />
                                </div>

                                {/* Giá và Link Ảnh (Nằm cùng 1 hàng) */}
                                <div style={{display: 'flex', gap: '20px'}}>
                                    <div className="form-group" style={{flex: 1}}>
                                        <label>Giá tiền (VNĐ):</label>
                                        <input 
                                            className="input-admin"
                                            placeholder="50000" 
                                            type="number" 
                                            onChange={e => setProducts({...products, price: e.target.value})} 
                                            required 
                                        />
                                    </div>
                                    <div className="form-group" style={{flex: 1}}>
                                        <label>Link hình ảnh (URL):</label>
                                        <input 
                                            className="input-admin"
                                            placeholder="https://..." 
                                            onChange={e => setProducts({...products, image: e.target.value})} 
                                            required 
                                        />
                                    </div>
                                </div>

                                {/* Mô tả */}
                                <div className="form-group">
                                    <label>Mô tả chi tiết:</label>
                                    <textarea 
                                        className="input-admin"
                                        placeholder="Mô tả thành phần, hương vị..." 
                                        onChange={e => setProducts({...products, description: e.target.value})} 
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

                {/* --- TAB USER (ĐÃ SỬA LỖI) --- */}
                {activeTab === 'users' && (
                    <div>
                        <h3>Danh sách Người dùng</h3>
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Họ và Tên</th>
                                    <th>Email</th>
                                    <th>Quyền (Role)</th>
                                    <th>SĐT</th>
                                    <th>Địa chỉ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users && users.length > 0 ? (
                                    users.map((user, index) => (
                                        /* SỬA LỖI KEY: Dùng user._id, nếu không có thì dùng index tạm */
                                        <tr key={user._id || index}> 
                                            
                                            {/* SỬA LỖI CRASH: Kiểm tra ID tồn tại trước khi cắt chuỗi */}
                                            <td title={user._id || user.id}>
                                                {/* Nếu có _id thì cắt, nếu không thì hiện "N/A" */}
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
                                        {/* SỬA LỖI COLSPAN: Phải viết hoa chữ S (colSpan) */}
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