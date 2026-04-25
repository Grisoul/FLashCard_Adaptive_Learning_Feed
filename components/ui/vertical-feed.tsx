import React, { useCallback, useEffect, useRef, useState } from "react";
import { FeedResponse, FlashCardType, QuizType } from "@/lib/types";
import FlashCard from "./FlashCard";
import useMutation from "@/hooks/useMutation";
import { fetchFeed } from "@/lib/fetchFeed";
import Loading from "./loading";
import { Card } from "./card";
import { InfoIcon } from "@phosphor-icons/react/dist/ssr";


interface VerticalFeedProps {
    notes: string;
}

type FeedResponse = {
    batchNumber: number;
    cards: FlashCardType[];
    quizzes: {
        question: string;
        options: string[];
        answer: number;
    }[];
};

type FeedRequest = {
    notes: string;
    batchNumber: number;
};


export default function VerticalFeed( { notes }: VerticalFeedProps ) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [lastTop, setLastTop] = useState(0);

    const scrollBox = useRef<HTMLDivElement | null>(null);

    const { data, error, execute, isLoading } = useMutation<FeedResponse>(fetchFeed);

    useEffect(() => {
        const fetch = async () => {
            console.log("fetching");
            // TODO: pass notes here
            await execute({
                notes,
                batchNumber: 1,
            });
            console.log("notes received by feed:", notes);
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
                    <div key={idx}>
                        {quiz.question}
                    </div>
                ))}
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
