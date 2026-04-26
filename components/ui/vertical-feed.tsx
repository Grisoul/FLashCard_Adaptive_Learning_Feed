import React, { useEffect, useRef, useState } from "react";
import FlashCard from "./FlashCard";
import useMutation from "@/hooks/useMutation";
import { fetchFeed } from "@/lib/fetchFeed";
import Loading from "./loading";
import { Card } from "./card";
import { InfoIcon } from "@phosphor-icons/react/dist/ssr";
import { FeedResponse } from "@/lib/types";


interface VerticalFeedProps {
    notes: string;
}

export default function VerticalFeed({ notes }: VerticalFeedProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cards, setCards] = useState<any[]>([]);
    const [batchNumber, setBatchNumber] = useState(1);
    const [isFetchingNextBatch, setIsFetchingNextBatch] = useState(false);

    const scrollBox = useRef<HTMLDivElement | null>(null);

    const { data, error, execute, isLoading } = useMutation<FeedResponse>(fetchFeed as any);

    useEffect(() => {
        const fetch = async () => {
            console.log("fetching");
            await execute({
                notes,
                batchNumber: 1,
            });
        }
        fetch();
    }, [])

    useEffect(() => {
        if (!data || typeof data === "boolean") return;

        setCards((prev) => [...prev, ...data.cards]);
    }, [data]);

    useEffect(() => {
        if (currentIndex > 0 && currentIndex >= cards.length - 10 && !isFetchingNextBatch) {
            const nextBatch = batchNumber + 1;

            setIsFetchingNextBatch(true);

            execute({
                notes,
                batchNumber: nextBatch,
            })
            .then(() => {
                setBatchNumber(nextBatch);
            })
            .catch((err) => {
                console.error("Error fetching next batch:", err);
            })
            .finally(() => {
                setIsFetchingNextBatch(false);
            });
        }
    }, [currentIndex, cards.length, isFetchingNextBatch, batchNumber, notes]);

    const handleScroll = () => {
        if (!scrollBox.current) return;

        const top = scrollBox.current.scrollTop;
        const height = scrollBox.current.clientHeight;
        const index = Math.round(top / height);

        setCurrentIndex(index);
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

        if (isLoading && cards.length === 0) return (
            <div className="flex h-full">
                <Loading />
            </div>
        );

        if (!data || typeof data === "boolean") return null;

        return (
            <>
                {cards.map((content, idx) => (
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
                onScroll={handleScroll}
            >
                {renderContent()}
            </div>
        </React.Fragment>
    );
}
