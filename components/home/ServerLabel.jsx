import { useState } from "react";

export default function Label({ text, distanceFromTop }) {
    return (
        <div
            className={`absolute grid ml-3 left-full place-content-center -translate-y-1/2`}
            style={{ top: `${distanceFromTop}px` }}>
            <div className="bg-discordGrey-850 rounded-md text-discordGrey-50 z-[100] p-2 relative guild-label">
                {text}
            </div>
        </div>
    );
}
