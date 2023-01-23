import { useState } from "react";
import GuildIcon from "../GuildIcon";
import CreateGuildIcon from "components/CreateGuildIcon";

function ServerLabel({ text, distanceFromTop }) {
    return (
        <div
            className={`absolute z-[500] ml-3 left-full -translate-y-1/2`}
            style={{ top: `${distanceFromTop}px` }}>
            <div className="w-max bg-discordGrey-900 shadow-md rounded-md text-discordGrey-150 z-[100] p-2 relative guild-label">
                {text}
            </div>
        </div>
    );
}

export default function SideBar({
    guilds,
    selectedGuild,
    selectGuild,
    createGuild,
}) {
    let timeout = null;

    const [isScrolling, setIsScrolling] = useState(false);
    const [labelData, setLabelData] = useState({
        text: "",
        distanceFromTop: 0,
    });

    const handleScroll = () => {
        if (!isScrolling) {
            setIsScrolling(true);
        }

        if (labelData.text !== "") {
            setLabelData({
                text: "",
                distanceFromTop: 0,
            });
        }

        if (timeout !== null) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(function () {
            setIsScrolling(false);
        }, 500);
    };

    return (
        <div className="relative h-full flex flex-col w-[4.5em] px-2 bg-discordGrey-850">
            {labelData.text !== "" && !isScrolling ? (
                <ServerLabel
                    text={labelData.text}
                    distanceFromTop={labelData.distanceFromTop}
                />
            ) : null}

            <div
                className="py-2 flex-1 overflow-y-auto no-scrollbar"
                onScroll={handleScroll}>
                <GuildIcon
                    guildData={{
                        id: "none",
                        name: "Messaggi diretti",
                        icon: "/discordLogo.svg",
                    }}
                    selectedGuild={selectedGuild}
                    selectGuild={selectGuild}
                    setLabelData={setLabelData}
                />

                <div className="bg-discordGrey-750 my-1 mx-3 h-[0.125em]" />

                {guilds.length !== 0 && (
                    <>
                        {guilds.map((guildData, index) => (
                            <GuildIcon
                                key={index}
                                guildData={guildData}
                                selectedGuild={selectedGuild}
                                selectGuild={selectGuild}
                                setLabelData={setLabelData}
                            />
                        ))}
                    </>
                )}

                <div className="bg-discordGrey-750 my-1 mx-3 h-[0.125em]" />

                <CreateGuildIcon
                    setLabelData={setLabelData}
                    createGuild={createGuild}
                />
            </div>
        </div>
    );
}
