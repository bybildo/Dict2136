import { apiUrl } from '@utils/constants.js'
import axios from 'axios';

const api = axios.create({ baseURL: apiUrl, withCredentials: true, });

export async function checkAuthorization() {
    const response = await api.get('/me');
    return response.data;
}