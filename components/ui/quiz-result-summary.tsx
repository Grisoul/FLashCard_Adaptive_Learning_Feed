"use client";

import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

interface QuizResultSummaryProps {
    correctCount: number;
    size: number;
}

export default function QuizResultSummary({ correctCount, size }: QuizResultSummaryProps) {
    const percentage = size ? Math.round((correctCount / size) * 100) : 0;
    const incorrect = size - correctCount;

    const data = [
        { name: "Correct", value: correctCount },
        { name: "Incorrect", value: incorrect },
    ];

    const getMessage = () => {
        if (percentage === 100) return "Perfect score! 🎉";
        if (percentage >= 80) return "Great job! You're a couple scrolls away from perfection";
        if (percentage >= 60) return "Not bad, keep going!";
        if (percentage >= 40) return "Keep practicing!";
        return "Don't give up!";
    };

    return (
        <div className="flex flex-col items-center gap-4 p-6">
            <h2 className="text-xl font-bold">Quiz Results</h2>

            <div className="relative flex items-center justify-center">
                <PieChart width={200} height={200}>
                    <Pie
                        data={data}
                        cx={95}
                        cy={95}
                        innerRadius={60}
                        outerRadius={90}
                        dataKey="value"
                        strokeWidth={0}
                    >
                        <Cell fill="#22c55e" />
                        <Cell fill="#f87171" />
                    </Pie>
                    <Tooltip />
                </PieChart>
                <div className="absolute flex flex-col items-center">
                    <span className="text-3xl font-bold">{percentage}%</span>
                    <span className="text-xs text-muted-foreground">Score</span>
                </div>
            </div>

            <p className="text-lg font-medium">{getMessage()}</p>

            <div className="flex gap-6 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span>{correctCount} Correct</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <span>{incorrect} Incorrect</span>
                </div>
            </div>
        </div>
    );
}
