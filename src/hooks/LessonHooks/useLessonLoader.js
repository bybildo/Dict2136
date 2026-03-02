import { useEffect, useState } from "react";

export const useLessonLoader = ({ lessonName, onError = (error) => { } }) => {
    const [Lesson, setLesson] = useState({});
    const [isLoad, setIsLoad] = useState(false);

    useEffect(() => {
        setIsLoad(true);

        const LessonFromLocalStorage = localStorage.getItem('lesson:_' + lessonName);

        if (LessonFromLocalStorage) {
            const lesson = JSON.parse(LessonFromLocalStorage);
            const normalizedCards = Array.isArray(lesson.cards)
                ? lesson.cards
                : (Array.isArray(lesson.words) ? lesson.words : []);

            // Keep backward/forward compatibility: some lessons were saved as `words`, others as `cards`.
            // Also keep both fields so later saves don't "flip" the schema and break list loading.
            lesson.cards = normalizedCards;
            lesson.words = normalizedCards;

            // Ensure studyLevel exists (older lessons may not have it).
            lesson.cards = lesson.cards.map((c, index) => ({
                index: c.index ?? index,
                studyLevel: c.studyLevel ?? 0,
                ...c,
            }));
            lesson.type = 'local';
            lesson.id = 'lesson:_' + lessonName;

            setLesson(lesson);
            setIsLoad(false);
        }
        else {
            onError(new Error('Lesson not found'));
            setIsLoad(false);
        }
    }, [lessonName]);

    return { Lesson, isLoad };
}