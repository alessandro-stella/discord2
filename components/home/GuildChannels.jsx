import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { IoIosArrowDown, IoMdClose } from "react-icons/io";
import { MdDelete } from "react-icons/md";

function OptionButton({ label, f }) {
    return (
        <div
            onClick={f}
            className="p-2 transition rounded-sm cursor-pointer select-none hover:bg-discordPurple-dark hover:text-white">
            {label}
        </div>
    );
}

export default function GuildChannels({
    guildName,
    guildId,
    channels,
    deleteGuild,
}) {
    const [showOptions, setShowOptions] = useState(false);

    useEffect(() => setShowOptions(false), [guildId]);

    return (
        <div className="bg-discordGrey-800 min-w-[15em] flex-1 flex flex-col justify-between relative">
            <div
                className="flex gap-2 px-4 py-3 transition-all shadow-sm cursor-pointer shadow-discordGrey-900 hover:bg-discordGrey-750"
                onClick={() => setShowOptions(!showOptions)}>
                <div className="flex-1 min-w-0 overflow-hidden font-bold tracking-wide select-none whitespace-nowrap text-ellipsis">
                    {guildName}
                </div>
                <div className="grid text-xl place-content-center">
                    {showOptions ? <IoMdClose /> : <IoIosArrowDown />}
                </div>
            </div>

            <div
                className={`absolute top-12 w-full p-2 transition origin-top text-sm text-discordGrey-250 ${
                    showOptions ? "scale-1" : "scale-0"
                }`}>
                <div className="flex flex-col gap-1 p-2 rounded-sm shadow-lg bg-discordGrey-900">
                    <OptionButton label="Change server name" f={() => {}} />

                    <div className="bg-discordGrey-800 h-[1px] w-[95%] m-auto" />

                    <div
                        onClick={() => deleteGuild({ guildName, guildId })}
                        className="flex items-center justify-between p-2 text-red-500 transition rounded-sm cursor-pointer select-none hover:bg-red-500 hover:text-white">
                        <span>Delete server</span>{" "}
                        <span className="text-lg">
                            <MdDelete />
                        </span>
                    </div>
                </div>
            </div>

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
