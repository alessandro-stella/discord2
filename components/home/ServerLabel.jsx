import { useState } from "react";

export default function Label({ text, distanceFromTop }) {
    const position = `top-[${distanceFromTop}px]`;

    return (
        <div
            className={`absolute grid ml-4 left-full place-content-center bg-red-600 ${position}`}>
            <div className="bg-discordGrey-850 rounded-md text-discordGrey-50 z-[100] p-2 relative guild-label">
                {text}
            </div>
        </div>
    );
}
