export class LessonOnList {
    title: string;
    description: string;
    authorName: string;
    wordCount: number;

    constructor(title : string, description : string, authorName : string, wordCount : number) {
        this.title = title;
        this.description = description;
        this.authorName = authorName;
        this.wordCount = wordCount;
    }
}