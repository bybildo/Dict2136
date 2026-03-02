import { apiUrl } from '@utils/constants.js'
import { Lesson } from 'model/Lesson';
import { LessonOnList } from 'model/LessonOnList';
import axios from 'axios';

const api = axios.create({ baseURL: apiUrl, withCredentials: true, });

export async function addLesson(lesson: Lesson) {
    try {
        const response = await api.post('/AddLesson', lesson);
        return response.data;
    }
    catch (error) {
        console.error("Error adding lesson:", error);
        return [];
    }
}

export async function getUserLessonsList() : Promise<LessonOnList[]> {
    try {
        const response = await api.get('/GetMyLessons');
        return response.data;
    }
    catch (error) {
        console.error("Error fetching user lessons:", error);
        return [];
    }
}