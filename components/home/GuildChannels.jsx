import { signOut } from "next-auth/react";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export default function GuildChannels({
    guildName,
    guildId,
    channels,
    deleteGuild,
}) {
    const [showOptions, setShowOptions] = useState(false);

    return (
        <div className="bg-discordGrey-800 min-w-[15em] flex-1 flex flex-col justify-between">
            <div className="px-4 py-3 shadow-sm shadow-discordGrey-900 flex gap-2 hover:bg-discordGrey-750 cursor-pointer transition-all">
                <div className="flex-1 min-w-0 whitespace-nowrap overflow-hidden text-ellipsis">
                    {guildName}
                </div>
                <div
                    className="text-xl grid place-content-center"
                    onClick={() => setShowOptions(!showOptions)}>
                    <IoIosArrowDown />
                </div>
            </div>

            {showOptions && (
                <div onClick={() => deleteGuild({ guildName, guildId })}>
                    DELETE
                </div>
            )}

            <div>
                Account
                <div
                    onClick={() =>
                        signOut({ redirect: false, callback: "/login" })
                    }>
                    Logout
                </div>
            </div>
        </div>
    );
}
