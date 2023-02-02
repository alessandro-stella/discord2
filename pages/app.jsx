import CreatePopup from "components/CreatePopup";
import CreateGuildPopup from "components/CreatePopup";
import DeleteGuildPopup from "components/DeleteGuildPopup";
import Guild from "components/home/Guild";
import SideBar from "components/home/SideBar";
import Overlay from "components/Overlay";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
    const router = useRouter();
    const { data: session, status } = useSession();

    const [userData, setUserData] = useState("loading");
    const [guilds, setGuilds] = useState("loading");
    const [selectedGuild, setSelectedGuild] = useState("none");

    const [isCreatingGuild, setIsCreatingGuild] = useState(false);
    const [createGuildIsLoading, setCreateGuildIsLoading] = useState(false);
    const [createGuildError, setCreateGuildError] = useState("");

    const [isDeletingGuild, setIsDeletingGuild] = useState({});
    const [deleteGuildIsLoading, setDeleteGuildIsLoading] = useState(false);
    const [deleteGuildError, setDeleteGuildError] = useState("");

    const [isCreatingChannel, setIsCreatingChannel] = useState(false);
    const [createChannelIsLoading, setCreateChannelIsLoading] = useState(false);
    const [createChannelError, setCreateChannelError] = useState("");

    useEffect(() => {
        if (status === "loading") return;
        if (!session) {
            router.push("/login");
            return;
        }

        if (session.email) {
            const processData = async () => {
                let response;

                response = await fetch("/api/getUserId", {
                    headers: {
                        "Content-Type": "application/json",
                        email: session.email,
                    },
                });

                const userId = await response.json();

                if (!userId) {
                    router.push("/registration");
                    return;
                }

                response = await fetch("/api/findUser", {
                    headers: {
                        "Content-Type": "application/json",
                        userId: userId,
                    },
                });

                const data = await response.json();
                setUserData(data);

                const guilds = await fetchGuilds(data.guilds);
                setGuilds(guilds);
            };

            processData();
        } else {
            const processData = async () => {
                setUserData(session.userData);

                const guilds = await fetchGuilds(session.userData.guilds);
                setGuilds(guilds);
            };

            processData();
        }
    }, [status, session, router]);

    useEffect(() => {
        if (!isCreatingGuild) {
            setCreateGuildIsLoading(false);
            setCreateGuildError("");
        }
    }, [isCreatingGuild]);

    useEffect(() => {
        console.log({ isCreatingChannel });
    }, [isCreatingChannel]);

    async function fetchGuilds(guildIds) {
        if (guildIds.length === 0) return [];

        const response = await fetch("/api/getGuildsForSidebar", {
            headers: {
                "Content-Type": "application/json",
                userGuilds: guildIds,
            },
        });

        const guilds = await response.json();

        return guilds;
    }

    function triggerError(error, f) {
        f(error);

        setTimeout(() => {
            f("");
        }, 5000);
    }

    const createNewGuild = (guildName) => {
        const createG = async () => {
            let guildData = await fetch("/api/createGuild", {
                headers: {
                    "Content-Type": "application/json",
                    name: guildName,
                    ownerId: userData.id,
                },
            });

            guildData = await guildData.json();

            if (guildData.error) {
                triggerError(guildData.error, setCreateGuildError);
            } else {
                setGuilds([...guilds, guildData]);
                setSelectedGuild(guildData.id);
                setIsCreatingGuild(false);
            }

            setCreateGuildIsLoading(false);
        };

        if (guildName === "") {
            triggerError("You have to insert a valid name!", setCreationError);
            return;
        }

        setCreateGuildIsLoading(true);
        createG();
    };

    const createNewChannel = (channelName, guildId) => {
        const createC = async () => {
            let channelData = await fetch("/api/createChannel", {
                headers: {
                    "Content-Type": "application/json",
                    name: channelName,
                    guild: guildId,
                },
            });

            channelData = await channelData.json();

            if (channelData.error) {
                triggerError(channelData.error, setCreateChannelError);
            } else {
                setIsCreatingChannel(false);
            }

            setCreateChannelIsLoading(false);
        };

        if (channelName === "") {
            triggerError(
                "You have to insert a valid name!",
                setCreateChannelError
            );
            return;
        }

        setCreateChannelIsLoading(true);
        createC();
    };

    const deleteGuild = (guildId) => {
        const deleteG = async () => {
            let response;

            response = await fetch("/api/deleteGuild", {
                headers: {
                    "Content-Type": "application/json",
                    guildId,
                },
            });

            const deleteResponse = await response.json();

            if (deleteResponse.error) {
                triggerError(deleteResponse.error, setDeleteGuildError);
            } else {
                setGuilds(
                    guilds.filter((guild) => guild.id !== deleteResponse.id)
                );
                setSelectedGuild("none");
                setIsDeletingGuild(false);
            }

            setDeleteGuildIsLoading(false);
        };

        setDeleteGuildIsLoading(true);
        deleteG();
    };

    return (
        <div className="flex h-screen text-white">
            {status === "loading" || userData === "loading" ? (
                "Loading"
            ) : (
                <>
                    <Overlay
                        close={
                            [
                                isCreatingGuild ? setIsCreatingGuild : null,
                                isCreatingChannel ? setIsCreatingChannel : null,
                                isDeletingGuild.guildId
                                    ? setIsDeletingGuild
                                    : null,
                            ].filter((f) => f)[0]
                        }>
                        {[
                            isCreatingGuild ? (
                                <CreatePopup
                                    name="guild"
                                    isLoading={createGuildIsLoading}
                                    error={createGuildError}
                                    create={createNewGuild}
                                    setIsCreating={setIsCreatingGuild}
                                />
                            ) : null,

                            isCreatingChannel ? (
                                <CreatePopup
                                    name="channel"
                                    isLoading={createChannelIsLoading}
                                    error={createChannelError}
                                    create={createNewChannel}
                                    setIsCreating={setIsCreatingChannel}
                                />
                            ) : null,

                            isDeletingGuild.guildId ? (
                                <DeleteGuildPopup
                                    guildName={isDeletingGuild.guildName}
                                    guildId={isDeletingGuild.guildId}
                                    error={deleteGuildError}
                                    isLoading={deleteGuildIsLoading}
                                    close={setIsDeletingGuild}
                                    deleteG={deleteGuild}
                                />
                            ) : null,
                        ].filter((f) => f)[0] || null}
                    </Overlay>

                    {guilds === "loading" ? (
                        "Loading"
                    ) : (
                        <SideBar
                            guilds={guilds}
                            selectedGuild={selectedGuild}
                            selectGuild={setSelectedGuild}
                            createGuild={() => setIsCreatingGuild(true)}
                        />
                    )}

                    {selectedGuild !== "none" && (
                        <Guild
                            guildId={selectedGuild}
                            deleteGuild={setIsDeletingGuild}
                            createChannel={setIsCreatingChannel}
                        />
                    )}
                </>
            )}
        </div>
    );
}
