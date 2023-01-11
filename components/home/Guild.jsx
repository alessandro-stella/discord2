import { useEffect, useState } from "react";
import GuildChannels from "./GuildChannels";
import Messages from "./Messages";

export default function Guild({ guildId }) {
    const [guildData, setGuildData] = useState({ name: guildId });

    const getGuildData = async () => {
        let response = await fetch("/api/getGuildData", {
            headers: { "Content-Type": "application/json", guildId },
        });

        setGuildData(await response.json());
    };

    useEffect(() => {
        getGuildData();
    }, [guildId]);

    useEffect(() => {
        console.log(guildData.name);
    }, [guildData]);

    return (
        <div className="bg-violet-500 flex-1 flex">
            <div>{guildData.name ?? "NO NAME"}</div>

            <GuildChannels />
            <Messages />
        </div>
    );
}
