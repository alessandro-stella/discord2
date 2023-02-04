import getGuildData from "database/functions/guilds/getGuildData";

export default async (req, res) => {
    const { guildid: guildId } = req.headers;

    const data = await getGuildData(guildId);

    res.status(data.status).json(data);
};
