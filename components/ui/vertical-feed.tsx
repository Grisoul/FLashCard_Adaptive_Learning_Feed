import React, { useState } from "react";

// mock
const data = ["1", "2", "3"];

export default function VerticalFeed() {
    return (
        <React.Fragment>
            <div className="w-full h-full scrollbar-hide overflow-y-scroll snap-y snap-mandatory">
                {data.map(content => (
                    <div key={content.at(0)}
                        className="
                        border-2 
                        border-red-400 
                        mb-2
                        w-full 
                        snap-center h-full flex items-center justify-center">
                        {content}
                    </div>
                ))}
            </div>
        </React.Fragment>
    );
}
