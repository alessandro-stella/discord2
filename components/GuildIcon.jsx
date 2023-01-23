import SimpleLoader from "components/SimpleLoader";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function GuildIcon({
    guildData,
    selectGuild,
    selectedGuild,
    setLabelData,
}) {
    const [data, setData] = useState("loading");

    useEffect(() => {
        const getData = async () => {
            if (guildData.id) {
                setData({ ...guildData });
                return;
            }

            let response = await fetch("/api/getGuildInfo", {
                headers: {
                    "Content-Type": "application/json",
                    guildId: guildData,
                },
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

    const icon = useRef(null);

    function getCoords(elem) {
        let box = elem.getBoundingClientRect();
        let body = document.body;
        let docEl = document.documentElement;
        let scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
        let clientTop = docEl.clientTop || body.clientTop || 0;
        let top = box.top + scrollTop - clientTop;
        let style = window
            .getComputedStyle(icon.current, null)
            .getPropertyValue("font-size");
        let fontSize = parseFloat(style);

        return Math.round(top + fontSize * 1.5);
    }

    const handleClick = () => {
        if (data === "loading") return;

        selectGuild(data.id);
    };

    const showLabel = () => {
        const distanceFromTop = getCoords(icon.current);

        setLabelData({
            text: data === "loading" ? data : data.name,
            distanceFromTop,
        });
    };

    const hideLabel = () => {
        setLabelData({
            text: "",
            distanceFromTop: 0,
        });
    };

    return (
        <div
            onClick={handleClick}
            className="relative w-full transition-all aspect-square">
            <div className="relative w-full px-1 py-1">
                <div
                    onFocus={showLabel}
                    onMouseEnter={showLabel}
                    onClick={showLabel}
                    onMouseLeave={hideLabel}
                    ref={icon}
                    className={`text-discordGrey-100 text-shadow h-full w-full aspect-square grid place-content-center hover:cursor-pointer relative ${
                        selectedGuild !== data.id
                            ? " rounded-[2rem] hover:rounded-2xl hover:text-white bg-discordGrey-750 hover:bg-discordPurple-normal"
                            : " rounded-2xl bg-discordPurple-normal text-white"
                    } transition-all`}>
                    {data === "loading" ? (
                        <SimpleLoader />
                    ) : (
                        <>
                            {data.icon ? (
                                <div className="p-[1em] w-full h-full relative select-none">
                                    <Image
                                        alt={data.name[0]}
                                        src={data.icon}
                                        layout="fill"
                                    />
                                </div>
                            ) : (
                                <div className="select-none">
                                    {data.name[0]}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
