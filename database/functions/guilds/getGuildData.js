import Guild from "database/models/guildModel";

export default async function getGuildData(guildId) {
    const data = Guild.findById(guildId)
        .then((res) => ({ id: res._id, name: res.name, status: 200 }))
        .catch((err) => ({ error: err.message, status: 500 }));

    return data;
}
