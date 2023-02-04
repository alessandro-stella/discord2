import getChannels from "database/functions/guilds/getChannels";

export default async (req, res) => {
    const { guildid: guildId } = req.headers;

    const data = await getChannels(guildId);

    res.status(data.status).json(data);
};
