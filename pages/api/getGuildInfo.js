import getGuildName from "database/functions/getGuildInfo";

export default async (req, res) => {
    const guildId = req.headers.guildid;

    const response = await getGuildName(guildId);

    res.status(200).json(response);
};
