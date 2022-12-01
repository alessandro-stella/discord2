import Guild from "database/models/guildModel";

export default async function getGuildsForSidebar(guildIds) {
    const ids = guildIds.split(",");

    const response = await Guild.find({ _id: { $in: ids } })
        .then((guild) =>
            guild.map((singleGuild) => ({
                id: singleGuild._id,
                name: singleGuild.name,
                icon: singleGuild.icon,
            }))
        )
        .catch((err) => ({
            error: "Error during the fetching process",
        }));

    return response;
}
