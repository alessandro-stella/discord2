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

            {guilds.length !== "none" && (
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
                onClick={createGuild}
                className="p-2 transition-all shadow-none cursor-pointer bg-amber-400 w-fit hover:shadow-md hover:shadow-amber-600">
                New Guild
            </div>
        </div>
    );
}
