import SimpleLoader from "components/SimpleLoader";
import Image from "next/image";
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

    function handleClick() {
        if (data === "loading") return;

        selectGuild(data.id);
    }

    return (
        <div
            onClick={() => handleClick()}
            className="relative w-full overflow-hidden transition-all aspect-square hover:overflow-visible">
            <div className="absolute grid h-full ml-4 left-full place-content-center">
                <div className="bg-discordGrey-850 rounded-md text-discordGrey-50 z-[100] p-2 relative guild-label">
                    {data === "loading" ? "Loading..." : data.name}
                </div>
            </div>

            <div className="w-full px-1 py-1">
                <div
                    className={`text-discordGrey-100 text-shadow h-full w-full aspect-square grid place-content-center hover:cursor-pointer relative ${
                        selectedGuild !== data.id
                            ? " rounded-full hover:rounded-[1.25em] bg-discordGrey-650 hover:bg-discordPurple"
                            : " rounded-2xl bg-discordPurple"
                    } transition-all`}>
                    {data === "loading" ? (
                        <SimpleLoader />
                    ) : (
                        <>
                            {data.icon ? (
                                <div className="p-[1em] w-full h-full relative">
                                    <Image
                                        alt={data.name[0]}
                                        src={data.icon}
                                        layout="fill"
                                    />
                                </div>
                            ) : (
                                data.name[0]
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
