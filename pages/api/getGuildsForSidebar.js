import getGuildsForSidebar from "database/functions/guilds/getGuildsForSidebar";

export default async (req, res) => {
    const guildIds = req.headers.userguilds;

    const response = await getGuildsForSidebar(guildIds);

    res.status(200).json(response);
};
