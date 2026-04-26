'use client';

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Button } from "./button";

interface QuizCardProps {
    quiz: {
        question: string;
        options: string[];
        answer: number;
    };
}

export default function QuizCard({ quiz }: QuizCardProps) {
    const [selected, setSelected] = useState<number | null>(null);
    const [showAnswer, setShowAnswer] = useState(false);

    const handleSelect = (index: number) => {
        setSelected(index);
        setShowAnswer(true);
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-lg">{quiz.question}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                {quiz.options.map((option, idx) => (
                    <Button
                        key={idx}
                        variant={selected === idx ? "default" : "outline"}
                        className="w-full justify-start"
                        onClick={() => handleSelect(idx)}
                        disabled={showAnswer}
                    >
                        {option}
                    </Button>
                ))}
                {showAnswer && (
                    <p className={`mt-4 text-sm ${selected === quiz.answer ? "text-green-600" : "text-red-600"}`}>
                        {selected === quiz.answer ? "Correct!" : `Incorrect. The answer is: ${quiz.options[quiz.answer]}`}
                    </p>
                )}
            </CardContent>
        </Card>
    );
}