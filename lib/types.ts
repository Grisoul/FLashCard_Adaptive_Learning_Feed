
export interface FlashCardType {
    front: string;
    back: string;
}

export interface Quiz {
    question: string;
    options: string[4];
    answer: number
}
