import axios from '@/axios';

export async function fetchUserData() {
  return axios.get('/api/user');
}
