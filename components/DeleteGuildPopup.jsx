import { useEffect } from "react";
import SimpleLoader from "./SimpleLoader";

export default function DeleteGuildPopup({
    guildName,
    guildId,
    close,
    deleteG,
    error,
    isLoading,
}) {
    return (
        <div className="flex flex-col gap-3 m-4 rounded-md bg-discordGrey-750 z-[100] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:min-w-[30em] md:max-w-[40%] w-5/6 overflow-hidden">
            <div className="p-4">
                <div className="pb-4 text-xl font-bold">
                    Deleting "{guildName}"
                </div>
                <div className="text-discordGrey-200">
                    Are you really sure you want to delete{" "}
                    <span className="font-bold text-discordGrey-100">
                        {guildName}
                    </span>
                    ? This action can't be undone, think about it carefully
                </div>

                {error && <div className="text-sm text-red-500">{error}</div>}
            </div>

            <div className="flex justify-end gap-6 p-4 bg-discordGrey-800">
                <div
                    className="grid place-content-center hover:underline cursor-pointer select-none"
                    onClick={() => close(false)}>
                    Cancel
                </div>

                <div
                    className={`bg-red-500 py-2 px-4 rounded-sm cursor-pointer hover:bg-[#952E2E] transition min-w-[30%] grid place-content-center select-none ${
                        isLoading ? "pointer-events-none" : ""
                    }`}
                    onClick={() => deleteG(guildId)}>
                    {isLoading ? <SimpleLoader /> : "Delete server"}
                </div>
            </div>
        </div>
    );
}
