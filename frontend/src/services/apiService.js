import axios from 'axios';

const API_URL = 'http://localhost:3001/api'; // URL ของ Backend

// ตั้งค่าให้ axios ส่ง token ไปกับทุก request โดยอัตโนมัติ
const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export const getMyTableAssignments = () => {
  return api.get('/assignments/my-table');
};

// สามารถเพิ่มฟังก์ชันอื่นๆ ได้ที่นี่ เช่น
// export const updateApplicantStatus = (id, status) => api.put(`/assignments/${id}/status`, { status });