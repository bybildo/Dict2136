export class Word {
    index: number;
    term: string;
    definition: string;
    studyLevel: number;

    constructor(index: number, term: string, definition: string, studyLevel : number = 0) {
        this.index = index;
        this.term = term;
        this.definition = definition;
        this.studyLevel = studyLevel;
    }
}