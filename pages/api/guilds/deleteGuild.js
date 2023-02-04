import deleteGuild from "database/functions/guilds/deleteGuild";

export default async (req, res) => {
    const { guildid: guildId } = req.headers;

    const deleteResponse = await deleteGuild(guildId);

    res.status(deleteResponse.status).json(deleteResponse);
};
