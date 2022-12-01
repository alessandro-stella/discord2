import CreateGuildForm from "components/CreateGuildForm";
import Guild from "components/home/Guild";
import SideBar from "components/home/SideBar";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
    const router = useRouter();
    const { data: session, status } = useSession();

    const [userData, setUserData] = useState("loading");
    const [guilds, setGuilds] = useState("loading");
    const [selectedGuild, setSelectedGuild] = useState("none");

    const [isCreatingGuild, setIsCreatingGuild] = useState(false);

    // Get user data
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
                    headers: { email: session.email },
                });

                const userId = await response.json();

                if (!userId) {
                    router.push("/registration");
                    return;
                }

                response = await fetch("/api/findUser", {
                    headers: { userId: userId },
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
            headers: { userGuilds: guildIds },
        });

        const guilds = await response.json();

        return guilds;
    }

    const createNewGuild = (guildName) => {
        const createG = async () => {
            let guildData = await fetch("/api/createGuild", {
                headers: { name: guildName, ownerId: userData.id },
            });

            guildData = await guildData.json();

            setGuilds([...guilds, guildData]);
            setIsCreatingGuild(false);
        };

        createG();
    };

    return (
        <div>
            {isCreatingGuild && (
                <CreateGuildForm
                    create={createNewGuild}
                    setIsCreatingGuild={setIsCreatingGuild}
                />
            )}

            {status === "loading" || userData === "loading" ? (
                "Loading"
            ) : (
                <div className="flex flex-col gap-4">
                    <>
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

                        {selectedGuild !== "none" ? (
                            <Guild guildId={selectedGuild} />
                        ) : (
                            <div>No guild selected</div>
                        )}
                    </>
                </div>
            )}

            <div
                onClick={() =>
                    signOut({ redirect: false, callback: "/login" })
                }>
                Logout
            </div>
        </div>
    );
}
