import CreateGuildForm from "components/CreateGuildForm";
import Guild from "components/home/Guild";
import SideBar from "components/home/SideBar";
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

            setGuilds([...guilds, guildData]);
            setIsCreatingGuild(false);
        };

        createG();
    };

    return (
        <div className="bg-cyan-300 flex h-screen">
            {status === "loading" || userData === "loading" ? (
                "Loading"
            ) : (
                <>
                    {isCreatingGuild && (
                        <CreateGuildForm
                            create={createNewGuild}
                            setIsCreatingGuild={setIsCreatingGuild}
                        />
                    )}

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

                    {/* <Guild
                        guildId={
                            selectedGuild !== "none"
                                ? selectedGuild
                                : "637297706f6a3a60f5aa4344"
                        }
                    /> */}
                </>
            )}
        </div>
    );
}
