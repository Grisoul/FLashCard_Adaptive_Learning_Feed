import React, { useEffect, useRef, useState } from "react";
import { FlashCardType } from "@/lib/types";
import FlashCard from "./FlashCard";

// mock
const data: FlashCardType[] = [
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

    useEffect(() => {
        console.log(currentIndex);
    }, [currentIndex])

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
                {data.map((content, idx) => (
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
