import GuildIcon from "./GuildIcon";

export default function SideBar({
    guilds,
    selectedGuild,
    selectGuild,
    createGuild,
}) {
    return (
        <div className="flex flex-col w-[4.5em] px-2 bg-discordGrey-850">
            <GuildIcon
                guildData={{
                    id: "none",
                    name: "Home",
                    icon: "/discordLogo.svg",
                }}
                selectedGuild={selectedGuild}
                selectGuild={selectGuild}
            />

            {guilds.length !== 0 && (
                <>
                    {guilds.map((guildData, index) => (
                        <GuildIcon
                            key={index}
                            guildData={guildData}
                            selectedGuild={selectedGuild}
                            selectGuild={selectGuild}
                        />
                    ))}
                </>
            )}

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
    );
}
