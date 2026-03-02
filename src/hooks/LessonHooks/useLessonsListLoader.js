import { useState, useEffect } from "react";
import { getUserLessonsList } from "@services/lessonService";

export const useLessonsListLoader = () => {
    const [Lessons, setLessons] = useState([]);
    const [isLoad, setIsLoad] = useState(false);

    useEffect(() => {
        const isLocal = localStorage.getItem("isLocal");
        if (isLocal == 'true') {
            LoadLocalLesson();
        }
        else{
            LoadServerLessons();
        }
    }, []);

    const LoadLocalLesson = () => {
        try {
            setIsLoad(true);

            const loadedLessons = [];

            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);

                if (key.startsWith("lesson:")) {
                    const item = localStorage.getItem(key);
                    if (!item) continue;

                    const lesson = JSON.parse(item);
                    loadedLessons.push({
                        ...lesson,
                        id: key.replace("lesson:_", "")
                    });
                }
            }

            const lessons = loadedLessons
                .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                .map(l => ({
                    title: l.title,
                    description: l.description,
                    cardsLength: l.words.length,
                    id: l.id,
                    author: 'you'
                }));

            setLessons(lessons);
        } catch (err) {
            console.error('❌ Error loading lessons:', err);
        } finally {
            setIsLoad(false);
        }
    }

    const LoadServerLessons = async () => {
        try {
            setIsLoad(true);
            const lessons = await getUserLessonsList();
            setLessons(lessons);
        } catch (err) {
            console.error('❌ Error loading lessons:', err);
        } finally {
            setIsLoad(false);
        }
    }

    return { Lessons, isLoad };
}