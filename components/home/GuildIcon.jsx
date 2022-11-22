import { useEffect, useState } from "react";

export default function GuildIcon({ guildData, selectGuild, selectedGuild }) {
    const [data, setData] = useState("loading");

    useEffect(() => {
        const getData = async () => {
            if (guildData.id) {
                setData({ ...guildData });
                return;
            }

            let response = await fetch("/api/getGuildInfo", {
                headers: { guildId: guildData },
            });

            response = await response.json();

            if (response.id) {
                setData({ ...response });
            } else {
                setData({ name: "ERROR" });
            }
        };

        getData();
    }, [guildData]);

    return (
        <>
            {data === "loading" ? (
                "Loading"
            ) : (
                <div
                    onClick={() => selectGuild(data.id)}
                    className="relative w-full overflow-hidden aspect-square hover:overflow-visible transition-all">
                    <div className="absolute grid ml-4 left-full place-content-center h-full">
                        <div className="bg-green-400 p-2">{data.name}</div>
                    </div>

                    <div className="w-full h-full p-2">
                        <div className="rounded-full bg-cyan-400 h-full w-full grid place-content-center hover:cursor-pointer">
                            {data.name[0]}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
