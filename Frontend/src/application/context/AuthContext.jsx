import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Kiểm tra token khi load trang
    useEffect(() => {
        const token = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');
        
        // Kiểm tra kỹ hơn trước khi Parse
        if (token && savedUser && savedUser !== "undefined") {
            try {
                setUser(JSON.parse(savedUser));
            } catch (error) {
                // Nếu dữ liệu bị lỗi -> Xóa sạch để tránh sập web
                console.error("Dữ liệu user bị lỗi, đang reset...", error);
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            // QUAN TRỌNG: Phải có method: 'POST' và body
            console.log("1. Bắt đầu gọi API login...");
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            console.log("2. API login trả về:", data);

            if (!response.ok) {
                // Nếu server trả lỗi (400, 401, 404...)
                console.log("3. Login thất bại do:",data.message || data.error);
                throw new Error(data.error || data.message || 'Đăng nhập thất bại');
            }

            if (!data.token) {
                 console.error("4. LỖI TO: Server không trả về token!", data);
                 return { success: false, message: "Server lỗi: Không có token" };
            }
            
            // Lưu token và user
            console.log("4. Login thành công, lưu token và user vào localStorage.", data.token);
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            setUser(data.user);
            
            // Trả về user để bên ngoài dùng
            return { success: true, user: data.user };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const register = async (name, email, password) => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    fullName: name,
                    email: email, // Backend cần trường này là email
                    password: password 
                }),
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                 throw new Error(data.error || 'Đăng ký thất bại');
            }
            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};