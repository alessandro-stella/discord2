import { useEffect, useState } from "react";
import GuildChannels from "./GuildChannels";
import Messages from "./Messages";

export default function Guild({ guildId, deleteGuild }) {
    const [guildData, setGuildData] = useState({ name: guildId });

    useEffect(() => {
        const getGuildData = async () => {
            let response = await fetch("/api/getGuildData", {
                headers: { "Content-Type": "application/json", guildId },
            });

            setGuildData(await response.json());
        };

        getGuildData();
    }, [guildId]);

    return (
        <div className="flex-1 flex">
            <GuildChannels
                guildName={guildData.name}
                guildId={guildData._id}
                deleteGuild={deleteGuild}
            />
            <Messages />
        </div>
    );
}
