import Guild from "database/models/guildModel";

export default async function getGuildData(guildId) {
    const data = Guild.findById(guildId)
        .then((res) => res)
        .catch((err) => err.message);

    return data;
}
