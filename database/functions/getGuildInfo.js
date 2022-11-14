import Guild from "database/models/guildModel";

export default async function getGuildInfo(guildId) {
    const response = await Guild.findById(guildId)
        .then((guild) => ({ id: guildId, name: guild.name, icon: guild.icon }))
        .catch((err) => ({
            error: "The ID entered is invalid, check the syntax before trying again",
        }));

    return response;
}
