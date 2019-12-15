export class Exam {
    id: number;
    code: string;
    title: string;
    countQuestions: number;
    timeLimit: number;
    questions: Question[];
}

export class Question {
    id: number;
    orderId: number;
    title: string;
    answers: Answer[];
}

export class Answer {
    orderId: number;
    id: number;
    title: string;
    correct: boolean;
}