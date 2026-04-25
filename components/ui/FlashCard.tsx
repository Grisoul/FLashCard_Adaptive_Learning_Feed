'use client';

import { FlashCardType } from "@/lib/types";
import { Card, CardContent } from "./card";
import { useEffect, useRef, useState } from "react";

interface FlashCardProps {
    id: number;
    flashcard: FlashCardType;
    descriptionTitle?: string;
    description?: string;
}

export default function FlashCard(props: FlashCardProps) {

    const card = props.flashcard;
    const [flipped, setFlipped] = useState(false);
    const [taps, setTaps] = useState(0);

    const frontRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const animGradients = ["animated-card-gradient-1", "animated-card-gradient-2"];
        const i = Math.round(Math.random() * (animGradients.length - 1));
        const animation = animGradients[i];
        console.log("animation", animation);
    }, [props.id]);

    function handleTap() {
        const newTaps = taps + 1;
        setTaps(newTaps);
        if (newTaps === 2) {
            setFlipped(!flipped);
            setTaps(0);
        }
        setTimeout(() => setTaps(0), 300);
    }

    return (
        <div
            onClick={handleTap}
            className="w-full h-full cursor-pointer flex flex-col"
            style={{ perspective: "1000px" }}
        >
            <div
                className="w-full flex-1 min-h-0"
                style={{
                    transformStyle: "preserve-3d",
                    transition: "transform 300ms ease",
                    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                    position: "relative",
                }}
            >
                <div
                    id="front"
                    style={{ backfaceVisibility: "hidden" }}
                    className="absolute inset-0"
                >
                    <Card className="w-full h-full" ref={frontRef}>
                        <CardContent className="relative h-full flex items-center justify-center">
                            <p className="text-center font-bold text-2xl">{card.front.trim()}</p>
                            <p className="absolute bottom-4 text-sm text-muted-foreground">
                                Double Tap To Reveal Answer
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div
                    id="back"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                    className="absolute inset-0"
                >
                    <Card className="w-full h-full">
                        <CardContent className="relative h-full flex items-center justify-center p-6">
                            <p className="text-center font-bold text-xl">{card.back.trim()}</p>
                            <p className="absolute bottom-4 text-sm text-muted-foreground">
                                Double Tap To Flip Back
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {(props.descriptionTitle || props.description) && (
                <div className="w-full px-1 pt-3 pb-1 flex flex-col gap-1">
                    {props.descriptionTitle && (
                        <p className="font-semibold text-sm line-clamp-1">{props.descriptionTitle}</p>
                    )}
                    {props.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">{props.description}</p>
                    )}
                </div>
            )}
        </div>
    );
}
