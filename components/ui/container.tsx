'use client';

import React from "react";

interface ContainerProps {
    children?: React.ReactNode;
    className?: string;
};

export default function Container(props: ContainerProps) {
    return (
        <React.Fragment>
            <div className={`flex flex-col h-screen items-center justify-center p-10 ` + props.className}>
                {props.children}
            </div>
        </React.Fragment>
    );
}
