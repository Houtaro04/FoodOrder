import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:5000/api', // Trỏ vào backend của bạn
  headers: {
    'Content-Type': 'application/json',
  },
});

// Thêm interceptor để tự động gắn Token vào mỗi request (cho chức năng đăng nhập sau này)
axiosClient.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('token'); // Lấy token từ bộ nhớ trình duyệt
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;