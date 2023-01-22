export default function Label({ text, distanceFromTop }) {
    return (
        <div
            className={`absolute  ml-3 left-full -translate-y-1/2`}
            style={{ top: `${distanceFromTop}px` }}>
            <div className="w-max bg-discordGrey-850 rounded-md text-discordGrey-150 z-[100] p-2 relative guild-label">
                {text}
            </div>
        </div>
    );
}
