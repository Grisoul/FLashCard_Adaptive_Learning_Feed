import { QuizType } from "@/lib/types";
import React, { Ref, useEffect, useState } from "react";
import { Card, CardContent } from "./card";
import { Button } from "./button";

interface QuizCardProps {
    quiz: QuizType;
    ref?: Ref<HTMLDivElement>;
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
                    <div className="flex flex-wrap w-full">
                        <Button className="h-auto w-full py-2 whitespace-normal break-words" key={i} onClick={() => handleClick(i)}>{q}</Button>
                    </div>
                ))}
            </div>
        );
    };

    const renderAnswered = (ans: number) => {
        const renderBtn = (msg: string, i: number) => {
            if (i === ans && ans !== quiz.answer) {
                return (
                    <Button key={i} className="h-auto w-full py-2 whitespace-normal break-words bg-red-500 pointer-events-none" > {msg}</Button>
                );
            }

            if (i === quiz.answer) {
                return (
                    <Button key={i} className="h-auto w-full py-2 whitespace-normal break-words bg-green-500 pointer-events-none">{msg}</Button>
                );
            } else {
                return (
                    <Button className="h-auto w-full py-2 whitespace-normal break-words pointer-events-none" key={i} variant="outline">{msg}</Button>
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
            <Card ref={props.ref}>
                <CardContent className="flex flex-col gap-6">
                    <p>{quiz.question}</p>
                    {!isAnswered ? renderUnanswered() : renderAnswered(answer)}
                </CardContent>
            </Card>
        </React.Fragment>
    );
}
