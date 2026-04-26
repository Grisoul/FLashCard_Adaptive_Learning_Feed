
export interface FlashCardType {
    front: string;
    back: string;
}

export interface QuizType {
    question: string;
    options: Array<string>;
    answer: number
}

export type FeedResponse = {
    batchNumber: number;
    cards: FlashCardType[];
    quizzes: QuizType[];
};

export type FeedRequest = {
    notes: string;
    batchNumber: number;
};
