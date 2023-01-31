import Guild from "database/models/guildModel";

export default async function deleteGuild(guildId) {
    console.log({ guildId });

    const deleteResponse = await Guild.findByIdAndDelete(guildId).then(
        (res) => {
            return res;
        }
    );

    console.log({ deleteResponse });

    return { daje: "Roma" };
}
