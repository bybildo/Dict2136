import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

export async function speechTextAPI(text) {
    try {
        const response = await api.post('/api/speech', { text }, { responseType: 'blob' });

        if (!response?.data) return;

        const blob = response.data;
        const url = URL.createObjectURL(blob);
        new Audio(url).play();
    }
    catch (error) {
        console.error('Speech API error:', error);
        // throw error;
    }
}