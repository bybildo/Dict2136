import { Word } from "@model/Word";

export class Lesson {
    title: string;
    description: string;
    words: Array<Word>;
    isPublic: boolean;
    termLanguage: string;
    definitionLanguage: string;
    createdAt: string;
    openedAt: string;
    
    constructor(title : string, description : string, words : Array<Word>, isPublic : boolean, termLanguage : string = 'en', definitionLanguage : string = 'en', createdAt : string = new Date().toUTCString(), openedAt : string = new Date().toUTCString()) {
        this.title = title;
        this.description = description;
        this.words = words;
        this.isPublic = isPublic    ;
        this.termLanguage = termLanguage;
        this.definitionLanguage = definitionLanguage;
        this.createdAt = createdAt;
        this.openedAt = openedAt;
    }
}