import SimpleLoader from "components/SimpleLoader";
import { useEffect, useState } from "react";
import GuildChannels from "./GuildChannels";
import Messages from "./Messages";

export default function Guild({
    guildId,
    channels,
    setChannels,
    selectedChannel,
    selectChannel,
    deleteGuild,
    createChannel,
}) {
    const [guildData, setGuildData] = useState({ name: guildId });

    useEffect(() => {
        if (guildData.name === guildId) return;

        const fetchChannels = async () => {
            let response = await fetch("/api/guilds/getChannels", {
                headers: {
                    "Content-Type": "application/json",
                    guildId,
                },
            });

            response = await response.json();

            if (response.error) {
                console.log(response.error);
            } else {
                setChannels(response.channels);
            }
        };

        fetchChannels();
    }, [guildData]);

    useEffect(() => {
        const getGuildData = async () => {
            let response = await fetch("/api/guilds/getGuildData", {
                headers: { "Content-Type": "application/json", guildId },
            });

            const guildDataResponse = await response.json();

            setGuildData(guildDataResponse);
        };

        getGuildData();
    }, [guildId]);

    useEffect(() => {
        console.log(selectedChannel);
    }, [selectedChannel]);

    return (
        <div className="flex-1 flex">
            {guildData && (
                <>
                    <GuildChannels
                        guildName={
                            guildData.name === guildId ? (
                                <SimpleLoader />
                            ) : (
                                guildData.name
                            )
                        }
                        guildId={guildData._id}
                        channels={channels}
                        selectedChannel={selectedChannel}
                        selectChannel={selectChannel}
                        deleteGuild={deleteGuild}
                        createChannel={createChannel}
                    />

                    <Messages />
                </>
            )}
        </div>
    );
}
