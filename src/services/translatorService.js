import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export async function translateText(text, to, ids = null) {
    try {
        const textsArray = Array.isArray(text) ? text : [text];

        const payload = {
        to,
        texts: textsArray.map((t, index) => ({
            id: ids ? ids[index] : index.toString(),
            text: t}))
        }

        const response = await api.post('/api/translate', payload);
        return response.data;
    } 
    catch (error) {
        console.error('Translation error:', error);
        // throw error;
    }
}