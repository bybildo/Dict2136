export class studyLevelService {
    #lesson;
    #tasks = [];

    constructor(lesson) {
        this.#lesson = lesson;
    }

    getTasks() {
        return this.#tasks;
    }

    getLesson() {
        return this.#lesson;
    }

    addTask(task) {
        this.#tasks.push(task);
    }

    applyTasks() {
        if (this.#lesson.type === 'local') {
            const cards = Array.isArray(this.#lesson.cards)
                ? this.#lesson.cards
                : (Array.isArray(this.#lesson.words) ? this.#lesson.words : []);

            this.#lesson.cards = cards;
            this.#lesson.words = cards;

            for (const task of this.#tasks) {
                const [index, pointsStr] = task.split(' ');
                const points = Number(pointsStr);
                const targetCards = [cards[Number(index)]].filter(Boolean);

                targetCards.forEach(card => {
                    card.studyLevel = Math.max(0, Math.min(card.studyLevel + points, 100));
                });
            }

            localStorage.setItem(this.#lesson.id, JSON.stringify(this.#lesson));
            this.#tasks = [];
        }
    }
}