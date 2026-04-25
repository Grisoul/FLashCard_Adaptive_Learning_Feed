'use client';

import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container"
import HomeButton from "@/components/ui/home-button";
import { TiktokFrame } from "@/components/ui/tiktokframe"
import UploadButton from "@/components/ui/upload-button";
import UploadCard from "@/components/ui/upload-card"
import { HouseIcon, HouseSimpleIcon, UserCircleIcon } from "@phosphor-icons/react";
import { PlusIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export default function Page() {
    return (
        <Container className={`animated-gradient`}>
            <TiktokFrame className="border-3 border-accent">
                <div className="">
                    <h1 className="text-3xl font-bold">Upload Your Notes</h1>
                </div>
                <div className="flex-1 w-full flex items-center justify-center p-5">
                    <UploadCard />
                </div>
                <div className="flex w-full justify-center gap-16 items-center text-4xl">
                    <HomeButton />
                    <UploadButton />
                    <UserCircleIcon />
                </div>
            </TiktokFrame>
        </Container>
    )
}
