import { useEffect, useState } from "react";
import GuildIcon from "./GuildIcon";
import Label from "./ServerLabel";

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
                <Label
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
                        name: "Home",
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

                <div className="bg-discordGrey-750 mx-1 h-[0.125em]" />

                <div
                    onClick={() => createGuild()}
                    className="relative w-full overflow-hidden transition-all aspect-square hover:overflow-visible">
                    <div className="absolute grid h-full ml-4 left-full place-content-center">
                        <div className="bg-discordGrey-850 rounded-md text-discordGrey-50 z-[100] p-2 relative guild-label">
                            Create guild
                        </div>
                    </div>

                    <div className="w-full px-1 py-1">
                        <div
                            className="text-shh-full w-full aspect-square grid place-content-center hover:cursor-pointer relative rounded-full hover:rounded-[1.25em] bg-discordGrey-650
                    hover:bg-green-500 transition-all cross-parent">
                            <div className="cross" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
