import { QuizType } from "@/lib/types";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "./card";
import { Button } from "./button";

interface QuizCardProps {
    quiz: QuizType;
    incrementCorrectCount: () => void
};

export default function QuizCard(props: QuizCardProps) {
    const quiz = props.quiz;

    const [isAnswered, setIsAnswered] = useState(false);
    const [answer, setAnswer] = useState(-1);

    const handleClick = (i: number) => {
        setAnswer(i);
        if (quiz.answer === i)
            props.incrementCorrectCount();
    };

    useEffect(() => {
        if (answer !== -1)
            setIsAnswered(true);
    }, [answer])

    const renderUnanswered = () => {
        return (
            <div className="flex flex-col gap-4">
                {quiz.options.map((q, i) => (
                    <Button key={i} onClick={() => handleClick(i)}>{q}</Button>
                ))}
            </div>
        );
    };

    const renderAnswered = (ans: number) => {
        const renderBtn = (msg: string, i: number) => {
            if (i === ans) {
                if (ans === quiz.answer) {
                    return (
                        <Button key={i} className="bg-green-500 pointer-events-none">{msg}</Button>
                    );
                } else {
                    return (
                        <Button key={i} className="bg-red-500 pointer-events-none">{msg}</Button>
                    );
                }
            } else {
                return (
                    <Button className="pointer-events-none" key={i} variant="outline">{msg}</Button>
                );
            }
        };

        return (
            <div className="flex flex-col gap-4">
                {quiz.options.map((opt, i) => (
                    renderBtn(opt, i)
                ))}
            </div>
        );
    };

    return (
        <React.Fragment>
            <Card>
                <CardContent className="flex flex-col gap-6">
                    <p>{quiz.question}</p>
                    {!isAnswered ? renderUnanswered() : renderAnswered(answer)}
                </CardContent>
            </Card>
        </React.Fragment>
    );
}
