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
                    className="p-2 shadow-none transition-all hover:cursor-pointer hover:shadow-md hover:shadow-cyan-800 bg-cyan-500 w-fit">
                    <div>Guild name: {data.name}</div>
                </div>
            )}
        </>
    );
}
