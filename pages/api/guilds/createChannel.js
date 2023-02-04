import createChannel from "database/functions/guilds/createChannel";

export default async (req, res) => {
    const { name, guildid: guildId } = req.headers;

    const newChannelData = await createChannel(name, guildId);

    res.status(newChannelData.status).json(newChannelData);
};
