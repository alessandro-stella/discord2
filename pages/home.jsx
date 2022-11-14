import GuildIcon from "components/GuildIcon";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
    const router = useRouter();
    const { data: session, status } = useSession();

    const [userData, setUserData] = useState("loading");
    const [guilds, setGuilds] = useState("loading");
    const [selectedGuild, setSelectedGuild] = useState(false);

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
                setGuilds(data.guilds);
            };

            processData();
        } else {
            setUserData(session.userData);
            setGuilds(session.userData.guilds);
        }
    }, [status, session, router]);

    function createNewGuild() {
        const createG = async () => {
            let guildData = await fetch("/api/createGuild", {
                headers: { name: "Salamella", ownerId: userData.id },
            });

            guildData = await guildData.json();

            setGuilds([...guilds, guildData]);
        };

        createG();
    }

    const handleChangeGuild = useCallback(
        (guildId) => {
            setSelectedGuild(guildId);
        },
        [selectedGuild]
    );

    return (
        <div>
            {status === "loading" || userData === "loading" ? (
                "Loading"
            ) : (
                <div className="flex flex-col gap-4 p-2">
                    <div>
                        {userData.image && (
                            <div className="relative w-16 h-16 overflow-hidden rounded-full">
                                <Image
                                    src={userData.image}
                                    layout="fill"
                                    alt="userImage"
                                />
                            </div>
                        )}
                        <div>
                            {userData.username}
                            {userData.identifier}
                        </div>
                        <div>{userData.id}</div>
                    </div>

                    <div className="p-2 bg-green-400 w-fit flex flex-col gap-2">
                        {guilds === "loading" ? (
                            "Loading"
                        ) : (
                            <>
                                {guilds.length !== 0 && (
                                    <div className="flex flex-col gap-2">
                                        {guilds.map((guildData, index) => (
                                            <GuildIcon
                                                key={index}
                                                guildData={guildData}
                                                selectedGuild={selectedGuild}
                                                selectGuild={handleChangeGuild}
                                            />
                                        ))}
                                    </div>
                                )}
                            </>
                        )}

                        <div
                            onClick={() => createNewGuild()}
                            className="p-2 bg-amber-400 w-fit cursor-pointer hover:shadow-2xl hover:shadow-amber-600">
                            New Guild
                        </div>
                    </div>

                    {selectedGuild && (
                        <div>Selected guild: {selectedGuild} </div>
                    )}

                    <div>
                        <div>E togliti su</div>
                        <button
                            onClick={() =>
                                signOut({
                                    redirect: false,
                                    callbackUrl: "/login",
                                })
                            }>
                            Sign Out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
