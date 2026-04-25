import { PlusIcon } from "@phosphor-icons/react";
import Link from "next/link";
import React from "react";
import { Button } from "./button";

export default function UploadButton() {
    return (
        <React.Fragment>
            <Link href="/">
                <Button variant="ghost" className="relative w-16 h-12">
                    <div className="absolute inset-0 bg-violet-500 rounded-2xl -translate-x-1.5" />
                    <div className="absolute inset-0 bg-[#fe2c55] rounded-2xl translate-x-1.5" />
                    <div className="absolute inset-0 bg-white rounded-2xl flex items-center justify-center">
                        <span className="text-black font-light leading-none">
                            <PlusIcon className="text-3xl text-black-500" />
                        </span>
                    </div>
                </Button>
            </Link>
        </React.Fragment>
    );
}
