import axiosCenter from "./axiosCenter";


const userApi = {
  getAllUsers: () => axiosCenter.get('/users'),
  createUser: (userData) => axiosCenter.post('/users', userData),
  getUserById: (id) => axiosCenter.get(`/users/${id}`),
  updateUser: (userId, updateData) => axiosCenter.patch(`/users/${userId}`, updateData),
}


export const {createUser, getAllUsers, getUserById, updateUser} =userApi