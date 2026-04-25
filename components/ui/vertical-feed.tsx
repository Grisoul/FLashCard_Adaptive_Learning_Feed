import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlashCardType } from "@/lib/types";
import FlashCard from "./FlashCard";
import useMutation from "@/hooks/useMutation";
import { fetchFeed } from "@/lib/fetchFeed";
import Loading from "./loading";
import { Card } from "./card";
import { InfoIcon } from "@phosphor-icons/react/dist/ssr";

// mock
const mockData: FlashCardType[] = [
    {
        front: "Test",
        back: "back"
    },
    {
        front: "Test",
        back: "back"
    },
];

export default function VerticalFeed() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [lastTop, setLastTop] = useState(0);
    const scrollBox = useRef<HTMLDivElement | null>(null);

    const { data, error, execute, isLoading } = useMutation(fetchFeed);

    useEffect(() => {
        const fetch = async () => {
            console.log("fetching");
            // TODO: pass notes here
            await execute("statistics");
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
                {error ?
                    <Card className="flex h-full bg-red-500 p-6 items-center justify-center">
                        <p className="flex gap-2 font-bold"><InfoIcon className="font-bold text-2xl" /> An error occured on our side. We strongly apologize for that.</p>
                    </Card>
                    : isLoading ?
                        <div className="flex h-full">
                            <Loading />
                        </div>
                        : mockData.map((content, idx) => (
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
