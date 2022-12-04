import SimpleLoader from "components/SimpleLoader";
import { useEffect, useState } from "react";

export default function Guild({ guildId }) {
    const [isLoading, setIsLoading] = useState(true);
    const [guildData, setGuildData] = useState({ name: guildId });

    useEffect(() => {
        const getGuildData = async () => {
            let response = await fetch("/api/getGuildData", {
                headers: { "Content-Type": "application/json", guildId },
            });

            setGuildData(await response.json());
            setIsLoading(false);
        };

        setIsLoading(true);
        getGuildData();
    }, [guildId]);

    useEffect(() => {
        console.log(guildData);
    }, [guildData]);

    return (
        <div className="bg-violet-500">
            {isLoading ? (
                <SimpleLoader />
            ) : (
                <>SelectedGuild: {guildData.name}</>
            )}
        </div>
    );
}
