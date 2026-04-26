import React, { useEffect, useRef, useState } from "react";
import FlashCard from "./FlashCard";
import useMutation from "@/hooks/useMutation";
import { fetchFeed } from "@/lib/fetchFeed";
import Loading from "./loading";
import { Card } from "./card";
import { InfoIcon } from "@phosphor-icons/react/dist/ssr";
import { FeedResponse } from "@/lib/types";
import QuizCard from "./quiz-card";
import QuizResultSummary from "./quiz-result-summary";


interface VerticalFeedProps {
    notes: string;
}

export default function VerticalFeed({ notes }: VerticalFeedProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [lastTop, setLastTop] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);

    const incrementCorrect = () => {
        setCorrectCount(correctCount + 1);
    }

    const scrollBox = useRef<HTMLDivElement | null>(null);

    const { data, error, execute, isLoading } = useMutation<FeedResponse>(fetchFeed as any);

    useEffect(() => {
        const fetch = async () => {
            await execute({
                notes,
                batchNumber: 1,
            });
        }
        fetch();
    }, [])

    const handleScroll = () => {
        if (scrollBox.current!.scrollTop > lastTop) {
            setCurrentIndex(currentIndex + 1);
            setLastTop(scrollBox.current!.scrollTop);
        } else if (scrollBox.current!.scrollTop < lastTop) {
            setCurrentIndex(currentIndex - 1);
            setLastTop(scrollBox.current!.scrollTop);
        }
    }

    const renderContent = () => {
        if (error) return (
            <Card className="flex h-full bg-red-500 p-6 items-center justify-center">
                <p className="flex gap-2 font-bold">
                    <InfoIcon className="font-bold text-2xl" />
                    An error occurred on our side. We strongly apologize for that.
                </p>
            </Card>
        );

        if (isLoading) return (
            <div className="flex h-full">
                <Loading />
            </div>
        );

        if (!data || typeof data === "boolean") return null;

        return (
            <>
                {data.cards.map((content, idx) => (
                    <div
                        key={idx}
                        className="px-2 py-10 w-full h-[550px] shrink-0 snap-start flex items-center justify-center"
                    >
                        <FlashCard id={idx} flashcard={content} />
                    </div>
                ))}

                {data.quizzes.map((quiz, idx) => (
                    <div key={idx}
                        className="px-2 py-10 w-full h-[550px] shrink-0 snap-start flex items-center justify-center" >
                        <QuizCard quiz={quiz} incrementCorrectCount={incrementCorrect} />
                    </div>
                ))}

                {
                    data &&
                    <div
                        className="px-2 py-10 w-full h-[550px] shrink-0 snap-start flex items-center justify-center" >
                        <QuizResultSummary correctCount={correctCount} size={data.quizzes.length} />
                    </div>
                }
            </>
        );
    };

    return (
        <React.Fragment>
            <div ref={scrollBox}
                className="
                w-full h-[550px]
                scrollbar-hide 
                overflow-y-scroll 
                snap-y 
                snap-always 
                snap-mandatory
                "
                onScrollEnd={() => handleScroll()}
            >
                {renderContent()}
            </div>
        </React.Fragment>
    );
}
