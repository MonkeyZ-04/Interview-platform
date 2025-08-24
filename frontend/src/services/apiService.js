import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
});

// ตั้งค่าให้ส่ง token ไปกับทุก request (ในระบบจริง token จะได้มาตอน login)
api.interceptors.request.use(config => {
  // const token = localStorage.getItem('token');
  const MOCK_TOKEN = 'mock-jwt-token'; // ใช้ token จำลองไปก่อน
  if (MOCK_TOKEN) {
    config.headers.Authorization = `Bearer ${MOCK_TOKEN}`;
  }
  return config;
});

export const getAllAssignments = () => api.get('/assignments');
export const getMyTableAssignments = () => api.get('/assignments/my-table');
export const updateAssignment = (id, data) => api.put(`/assignments/${id}`, data);
export const shuffleAssignments = (timeslot_id) => api.post('/assignments/shuffle', { timeslot_id });