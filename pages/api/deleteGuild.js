import deleteGuild from "database/functions/guilds/deleteGuild";

export default async (req, res) => {
    const { guildid: guildId } = req.headers;

    const deleteGuildResponse = await deleteGuild(guildId);

    res.status(200).json(deleteGuildResponse);
};
