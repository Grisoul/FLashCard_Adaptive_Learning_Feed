'use client';

import Container from "@/components/ui/container";
import HomeButton from "@/components/ui/home-button";
import { TiktokFrame } from "@/components/ui/tiktokframe";
import UploadButton from "@/components/ui/upload-button";
import VerticalFeed from "@/components/ui/vertical-feed";
import { UserCircleIcon } from "@phosphor-icons/react";
import React from "react";

export default function Feed() {

    return (
        <React.Fragment>
            <Container>
                <TiktokFrame>
                    <div className="">
                    </div>
                    <div className="flex-1 w-full flex items-center justify-center p-5">
                        <VerticalFeed notes="statistics" />
                    </div>
                    <div className="flex w-full justify-center gap-16 items-center text-4xl">
                        <HomeButton />
                        <UploadButton />
                        <UserCircleIcon />
                    </div>
                </TiktokFrame>
            </Container>
        </React.Fragment>
    );
}
