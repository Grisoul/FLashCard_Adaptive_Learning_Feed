'use client';

import Container from "@/components/ui/container";
import HomeButton from "@/components/ui/home-button";
import { TiktokFrame } from "@/components/ui/tiktokframe";
import UploadButton from "@/components/ui/upload-button";
import VerticalFeed from "@/components/ui/vertical-feed";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { UserCircleIcon } from "@phosphor-icons/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Feed() {

    const [savedNotes, setSavedNotes, deleteSavedNotes] = useLocalStorage<string | null>("notes", null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <React.Fragment>
            <Container className="animated-gradient">
                {mounted &&
                    <TiktokFrame>
                        <div className="">
                        </div>
                        <div className="flex-1 w-full flex items-center justify-center p-5">
                            {
                                savedNotes ?
                                    <VerticalFeed notes={String(savedNotes)} />
                                    : <p>Upload you notes first <Link href="/">here</Link>!</p>
                            }
                        </div>
                        <div className="flex w-full justify-center gap-16 items-center text-4xl">
                            <HomeButton />
                            <UploadButton />
                            <UserCircleIcon />
                        </div>
                    </TiktokFrame>
                }
            </Container>
        </React.Fragment>
    );
}
