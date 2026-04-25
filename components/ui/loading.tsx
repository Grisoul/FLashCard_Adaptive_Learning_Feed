import React from "react";

export default function Loading() {
    return (
        <React.Fragment>
            <div className="flex flex-col gap-5 items-center justify-center w-full h-full justify-center items-center">
                <p className="font-bold text-2xl">Hang Tight...</p>
                <div
                    className="w-10 h-10 rounded-full border-4 border-muted border-t-primary animate-spin" />
            </div>
        </React.Fragment>
    )
}
