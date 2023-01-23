import { useState } from "react";
import InputField from "./InputField";
import SimpleLoader from "./SimpleLoader";

export default function CreateGuildPopup({
    isLoading,
    error,
    create,
    setIsCreatingGuild,
}) {
    const [newGuildName, setNewGuildName] = useState("");

    return (
        <div className="flex flex-col gap-3 p-8 pt-6 m-4 rounded-md bg-discordGrey-700 z-[100] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:min-w-[40em] md:max-w-[40%] w-5/6">
            <div className="text-2xl">Create a new guild</div>

            <InputField
                label="Name"
                value={newGuildName}
                setValue={setNewGuildName}
                type="text"
            />

            {error && (
                <div className="text-sm text-red-500 text-shadow">{error}</div>
            )}

            <div className="flex flex-col gap-2 mt-1 md:flex-row">
                <div
                    onClick={() => create(newGuildName)}
                    className="text-white grid w-full py-2 text-center uppercase hover:brightness-110 transition-all rounded-sm shadow-md select-none bg-discordPurple-light hover:shadow-xl hover:cursor-pointer place-content-center">
                    {isLoading ? <SimpleLoader /> : "Create"}
                </div>
                <div
                    onClick={() => setIsCreatingGuild(false)}
                    className="py-2 text-center text-discordPurple-light hover:bg-discordPurple-light hover:bg-opacity-[15%] uppercase transition-all rounded-sm shadow-md select-none border-discordPurple-light border-[3px] font-semibold hover:shadow-xl hover:cursor-pointer w-full grid place-content-center">
                    {isLoading ? <SimpleLoader /> : "Go back"}
                </div>
            </div>
        </div>
    );
}
