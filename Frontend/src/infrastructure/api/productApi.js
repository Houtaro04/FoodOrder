import axiosClient from './axiosClient';

export const productApi = {
  getAll: () => {
    return axiosClient.get('/products'); // Gọi GET /api/products
  },
  getById: (id) => {
    return axiosClient.get(`/products/${id}`);
  }
};