import { signOut } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { BiHash } from "react-icons/bi";
import { IoIosArrowDown, IoMdClose, IoMdSettings } from "react-icons/io";
import { MdDelete } from "react-icons/md";

function OptionButton({ label, f }) {
    return (
        <div
            onClick={f}
            className="p-2 transition rounded-sm cursor-pointer select-none hover:bg-discordPurple-dark hover:text-white">
            {label}
        </div>
    );
}

function Channel({ id, name, selectChannel, selectedChannel, isOwner }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`flex flex-row items-center gap-1.5 hover:bg-discordGrey-750 transition cursor-pointer select-none text-md p-1 rounded-sm ${
                selectedChannel === id
                    ? "bg-discordGrey-700 hover:bg-discordGrey-700 text-white font-light"
                    : "text-discordGrey-450 hover:text-discordGrey-200"
            }`}
            onClick={() => selectChannel(id)}>
            <div className="text-xl">
                <BiHash />
            </div>

            <div className="overflow-hidden whitespace-nowrap text-ellipsis flex-1">
                {name}
            </div>

            {isOwner && (isHovered || selectedChannel === id) && (
                <div onClick={() => alert("OPEN SETTINGS")}>
                    <IoMdSettings />
                </div>
            )}
        </div>
    );
}

export default function GuildChannels({
    guildName,
    guildId,
    isOwner,
    channels,
    selectedChannel,
    selectChannel,
    deleteGuild,
    createChannel,
}) {
    const [showOptions, setShowOptions] = useState(false);
    const [isScrollable, setIsScrollable] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    const channelContainerRef = useRef(null);
    const channelRef = useRef(null);

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => checkScrollable(), [channels]);
    useEffect(() => setShowOptions(false), [guildId, channels]);

    let triggerResize = true;

    const handleResize = () => {
        if (triggerResize) {
            checkScrollable();

            triggerResize = false;

            setTimeout(function () {
                triggerResize = true;
            }, 500);
        }
    };

    function checkScrollable() {
        const containerHeight = channelContainerRef.current.clientHeight;
        const channelsHeight = channelRef.current.clientHeight;

        setIsScrollable(channelsHeight >= containerHeight);
    }

    return (
        <div className="bg-discordGrey-800 min-w-[15em] flex-1 flex flex-col relative min-h-0">
            <div
                className="flex gap-2 px-4 py-3 transition-all shadow-sm cursor-pointer shadow-discordGrey-900 hover:bg-discordGrey-750"
                onClick={() => setShowOptions(!showOptions)}>
                <div
                    className={`flex-1 select-none ${
                        typeof guildName === "string"
                            ? "min-w-0 overflow-hidden font-bold tracking-wide whitespace-nowrap text-ellipsis"
                            : "grid"
                    }`}>
                    {guildName}
                </div>

                <div className="grid text-xl place-content-center">
                    {showOptions ? <IoMdClose /> : <IoIosArrowDown />}
                </div>
            </div>

            <div
                className={`flex-1 min-h-0 overflow-y-auto mt-[2px]  ${
                    isHovering
                        ? "[--scrollbar-color:var(--discord-grey-850)]"
                        : "[--scrollbar-color:var(--discord-grey-800)]"
                }`}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                ref={channelContainerRef}>
                <div
                    className={`flex flex-col min-h-0 gap-1 p-2 ${
                        isScrollable ? "pr-0" : ""
                    }`}
                    ref={channelRef}>
                    {channels.map((channel) => (
                        <Channel
                            id={channel.id}
                            name={channel.name}
                            selectChannel={selectChannel}
                            selectedChannel={selectedChannel}
                            isOwner={isOwner}
                        />
                    ))}
                </div>
            </div>

            <div
                className={`absolute top-12 w-full p-2 transition origin-top text-sm text-discordGrey-250 ${
                    showOptions ? "scale-1" : "scale-0"
                }`}>
                <div className="flex flex-col gap-1 p-2 rounded-sm shadow-lg bg-discordGrey-900">
                    <OptionButton
                        label="Create channel"
                        f={() => createChannel(true)}
                    />

                    <div className="bg-discordGrey-800 h-[1px] w-[95%] m-auto" />

                    <OptionButton label="Change server name" f={() => {}} />

                    <div className="bg-discordGrey-800 h-[1px] w-[95%] m-auto" />

                    <div
                        onClick={() => deleteGuild({ guildName, guildId })}
                        className="flex items-center justify-between p-2 text-red-500 transition rounded-sm cursor-pointer select-none hover:bg-red-500 hover:text-white">
                        <span>Delete server</span>
                        <span className="text-lg">
                            <MdDelete />
                        </span>
                    </div>
                </div>
            </div>

            <div>
                Account
                <div
                    onClick={() =>
                        signOut({ redirect: false, callback: "/login" })
                    }>
                    Logout
                </div>
            </div>
        </div>
    );
}
