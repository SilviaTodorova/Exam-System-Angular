export class Exam {
    intId: number;
    title: string;
    countQuestions: number;
    timeLimit: number;
    questions: Question[];
}

export class Question {
    intId: number;
    orderId: number;
    title: string;
    answers: Answer[];
}

export class Answer {
    orderId: number;
    intId: number;
    title: string;
    correct: boolean;
}