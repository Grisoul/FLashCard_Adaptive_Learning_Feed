import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlashCardType } from "@/lib/types";
import FlashCard from "./FlashCard";
import useMutation from "@/hooks/useMutation";
import { fetchFeed } from "@/lib/fetchFeed";

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


export default function VerticalFeed() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [lastTop, setLastTop] = useState(0);

    const scrollBox = useRef<HTMLDivElement | null>(null);

    const { data, error, execute, isLoading } = useMutation(fetchFeed);

    useEffect(() => {
        const f = async () => {
            await execute("statistics");
            console.log(data);
        }
        f();
    }, [])

    const handleScroll = () => {
        console.log(scrollBox.current?.scrollTop, lastTop);
        if (scrollBox.current!.scrollTop > lastTop) {
            setCurrentIndex(currentIndex + 1);
            setLastTop(scrollBox.current!.scrollTop);
        } else if (scrollBox.current!.scrollTop < lastTop) {
            setCurrentIndex(currentIndex - 1);
            setLastTop(scrollBox.current!.scrollTop);
        }

    }

    return (
        <React.Fragment>
            <div ref={scrollBox}
                className="
                w-full h-full 
                scrollbar-hide 
                overflow-y-scroll 
                snap-y 
                snap-always 
                snap-mandatory"
                onScrollEnd={() => handleScroll()}
            >
                {cards.map((content, idx) => (
                    <div key={idx}
                        className="
                        px-2
                        py-5 
                        w-full 
                        snap-always 
                        snap-mandatory 
                        snap-start 
                        h-full 
                        flex 
                        items-center 
                        justify-center">
                        <FlashCard id={idx} flashcard={content} />
                    </div>
                ))}
            </div>
        </React.Fragment>
    );
}
