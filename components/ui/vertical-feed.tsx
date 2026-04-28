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
    const [quizCount, setQuizCount] = useState(0);
    const hasFetchedInitial = useRef(false);

    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const nextBatchRef = useRef(2);
    const scrollBox = useRef<HTMLDivElement | null>(null);

    const [feed, setFeed] = useState<FeedItem[]>([]);

    const { data, error, execute, isLoading } = useMutation<FeedResponse>(fetchFeed as any);
    const [isInitialLoading, setInitialLoading] = useState(true);

    const fetchBatch = async (batch: number) => {
        await execute({ notes, batchNumber: batch });
        setInitialLoading(false);
        nextBatchRef.current = batch + 1;
        console.log("fetched batch");
    };

    const handleScroll = () => {
        const el = scrollBox.current;
        if (!el || isFetchingMore || isInitialLoading) return;

        const remaining = el.scrollHeight - el.scrollTop - el.clientHeight;
        const shouldPrefetch = remaining < el.clientHeight * 18;

        if (shouldPrefetch) {
            console.log("prefetching next batch");
            setIsFetchingMore(true);

            fetchBatch(nextBatchRef.current).finally(() => {
                setIsFetchingMore(false);
        });
}
    };

    // initial fetch
    useEffect(() => {
        if (hasFetchedInitial.current) return;

        hasFetchedInitial.current = true;
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
                    id: `card-${data.batchNumber}-${i}-${crypto.randomUUID()}`
                })
            );

            const quizzes = data.quizzes.map((q, i) => (
                {
                    type: "quiz" as const,
                    content: q,
                    id: `quiz-${data.batchNumber}-${i}-${crypto.randomUUID()}`
                })
            );

            const max = Math.max(cards.length, quizzes.length);
            for (let i = 0; i < max; i++) {
                if (cards[i]) newItems.push(cards[i]);
                //if (cards[i + 1]) newItems.push(cards[i + 1]);
                if (quizzes[i]) newItems.push(quizzes[i]);
            }

            // push result summary at the end of each batch
            newItems.push({ type: "result", id: `result-${data.batchNumber}-${crypto.randomUUID()}` });

            setFeed(prev => [...prev, ...newItems]);
        }

    }, [data, mounted]);

    const incrementCorrect = () => setCorrectCount(c => c + 1);
    const incrementQuizCount = () => setQuizCount(c => c + 1);

    return (
        <React.Fragment>
            {isInitialLoading ?
                <Loading />
                :
                <div
                    ref={scrollBox}
                    onScroll={handleScroll}
                    className="w-full max-w-100 h-[500px] scrollbar-hide overflow-y-scroll snap-y snap-always snap-mandatory"
                    >
                    {feed.map((item, idx) => (
                        <div
                        key={item.id}
                        className="px-2 py-5 w-full h-[500px] shrink-0 snap-start flex items-center justify-center"
                        >
                        {item.type === "card" && (
                            <FlashCard id={idx} flashcard={item.content} />
                        )}

                        {item.type === "quiz" && (
                            <QuizCard
                            quiz={item.content}
                            incrementCorrectCount={incrementCorrect}
                            incrementQuizCount={incrementQuizCount}
                            />
                        )}

                        {item.type === "result" && (
                            <QuizResultSummary correctCount={correctCount} size={quizCount} />
                        )}
                        </div>
                    ))}

                    {isFetchingMore && (
                        <div className="h-[80px] flex items-center justify-center text-sm">
                        Generating more...
                        </div>
                    )}
                    </div>
            }
        </React.Fragment >
    );
}

