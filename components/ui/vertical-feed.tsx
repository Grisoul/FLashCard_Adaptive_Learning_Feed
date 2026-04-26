import React, { useEffect, useRef, useState } from "react";
import FlashCard from "./FlashCard";
import useMutation from "@/hooks/useMutation";
import { fetchFeed } from "@/lib/fetchFeed";
import Loading from "./loading";
import { Card } from "./card";
import { ArrowDownIcon, InfoIcon } from "@phosphor-icons/react/dist/ssr";
import { FeedResponse, FlashCardType, QuizType } from "@/lib/types";
import QuizCard from "./quiz-card";
import QuizResultSummary from "./quiz-result-summary";
import InfiniteScroll from "react-infinite-scroll-component";

interface VerticalFeedProps {
    notes: string;
}

type FeedItem =
    | { type: "card"; content: FlashCardType; id: string }
    | { type: "quiz"; content: QuizType; id: string }
    | { type: "result"; id: string };


export default function VerticalFeed({ notes }: VerticalFeedProps) {
    const [mounted, setMounted] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [batchNumber, setBatchNumber] = useState(1);

    const [feed, setFeed] = useState<FeedItem[]>([]);

    const { data, error, execute, isLoading } = useMutation<FeedResponse>(fetchFeed as any);
    const [isInitialLoading, setInitialLoading] = useState(true);

    const fetchBatch = async (batch: number) => {
        await execute({ notes, batchNumber: batch });
        setInitialLoading(false);
    };

    // initial fetch
    useEffect(() => {
        setMounted(true);
        fetchBatch(1);
    }, []);

    useEffect(() => {
        if (mounted) {
            if (!data || typeof data === "boolean") return;

            const newItems: FeedItem[] = [];

            const cards = data.cards.map((c, i) => (
                {
                    type: "card" as const,
                    content: c,
                    id: `card-${batchNumber}-${i}` + crypto.randomUUID()
                })
            );

            const quizzes = data.quizzes.map((q, i) => (
                {
                    type: "quiz" as const,
                    content: q,
                    id: `quiz-${batchNumber}-${i}` + crypto.randomUUID()
                })
            );

            const max = Math.max(cards.length, quizzes.length);
            for (let i = 0; i < max; i++) {
                if (cards[i]) newItems.push(cards[i]);
                if (cards[i + 1]) newItems.push(cards[i + 1]);
                if (quizzes[i]) newItems.push(quizzes[i]);
            }

            // push result summary at the end of each batch
            newItems.push({ type: "result", id: `result-${batchNumber}` });

            setFeed(prev => [...prev, ...newItems]);
        }

    }, [data, mounted]);

    const incrementCorrect = () => setCorrectCount(c => c + 1);

    const handleLoadMore = () => {
        console.log("fetching more...")
        fetchBatch(batchNumber);
    }

    return (
        <React.Fragment>
            {isInitialLoading ?
                <Loading />
                :
                <InfiniteScroll
                    dataLength={feed.length} //This is important field to render the next data
                    next={handleLoadMore}
                    hasMore={true}
                    loader={
                        <div className="flex items-center justify-center">
                            <div className="animate-pulse rounded-md bg-muted h-5 w-5 flex justify-center items-center">
                                <ArrowDownIcon />
                            </div>
                        </div>
                    }
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >

                    <div
                        className="w-full max-w-100 h-[500px] scrollbar-hide overflow-y-scroll snap-y snap-always snap-mandatory">
                        {feed.map((item, idx) => (
                            <div
                                key={idx}
                                className="px-2 py-5 w-full h-[500px] shrink-0 snap-start flex items-center justify-center">
                                {item.type === "card" && (
                                    <FlashCard
                                        id={idx}
                                        flashcard={item.content}
                                    />
                                )}
                                {item.type === "quiz" && (
                                    <QuizCard
                                        quiz={item.content}
                                        incrementCorrectCount={incrementCorrect}
                                    />
                                )}
                                {item.type === "result" && (
                                    <QuizResultSummary correctCount={correctCount} size={feed.filter(f => f.type === "quiz").length} />
                                )}
                            </div>
                        ))}
                    </div>
                </InfiniteScroll>
            }
        </React.Fragment >
    );
}



/*return (
            <>
                {/*batches.cards.map((content, idx) => (
                    <div
                        key={idx}
                        className="px-2 py-10 w-full h-[550px] shrink-0 snap-start flex items-center justify-center"
                    >
                        <FlashCard id={idx} flashcard={content} />
                    </div>
                ))}

                {data.quizzes.map((quiz, idx) => (
                    <div
                        key={`quiz-${idx}`}
                        className="px-2 py-10 w-full h-[550px] shrink-0 snap-start flex items-center justify-center"
                    >
                        <QuizCard quiz={quiz} />
                    </div>
                ))}
            </>
        );*/
