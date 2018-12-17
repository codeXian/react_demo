import axios from '@/axios';

export async function fetchUserData() {
  return axios.get('/api/user');
}

export async function fetchLoginData(params) {
  return axios.post('/api/login', params);
}
