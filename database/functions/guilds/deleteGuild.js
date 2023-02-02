import Guild from "database/models/guildModel";

export default async function deleteGuild(guildId) {
    const deleteResponse = await Guild.findByIdAndDelete(guildId)
        .then((res) => {
            // Implementare eliminazione dei messaggi e dei
            // canali di questa guild

            return { id: res._id, status: 200 };
        })
        .catch((e) => ({ error: e.message, status: 500 }));

    return deleteResponse;
}
