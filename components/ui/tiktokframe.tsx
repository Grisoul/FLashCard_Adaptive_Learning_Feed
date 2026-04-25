import React from "react";
import { Card, CardContent } from "./card";

interface TiktokFrameProps {
    className?: string;
    children?: React.ReactNode
}

export function TiktokFrame(props: TiktokFrameProps) {
    return (
        <React.Fragment>
            <Card className={`w-full max-w-md h-full ` + props.className}>
                <CardContent className="flex flex-col items-center gap-6 h-full">
                    {props.children}
                </CardContent>
            </Card>
        </React.Fragment>
    );
}
