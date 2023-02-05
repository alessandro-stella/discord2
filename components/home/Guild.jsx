import SimpleLoader from "components/SimpleLoader";
import { useEffect, useState } from "react";
import GuildChannels from "./GuildChannels";
import Messages from "./Messages";
import { useSession } from "next-auth/react";

export default function Guild({
    guildId,
    channels,
    setChannels,
    selectedChannel,
    selectChannel,
    deleteGuild,
    createChannel,
}) {
    const { data: session, status } = useSession();
    const [guildData, setGuildData] = useState({ name: guildId });
    const [isOwner, setIsOwner] = useState(false);

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
    }, [guildId, guildData, setChannels]);

    useEffect(() => {
        const getGuildData = async () => {
            let response = await fetch("/api/guilds/getGuildData", {
                headers: { "Content-Type": "application/json", guildId },
            });

            const guildDataResponse = await response.json();

            setGuildData(guildDataResponse);
        };

        const checkIsOwner = async () => {
            let response = await fetch("/api/authentication/checkIsOwner", {
                headers: {
                    "Content-Type": "application/json",
                    guildId,
                    email: session.email,
                },
            });

            const isOwnerResponse = await response.json();

            setIsOwner(isOwnerResponse);
        };

        getGuildData();
        checkIsOwner();
    }, [guildId, session]);

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
                        guildId={guildData.id}
                        isOwner={isOwner}
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
