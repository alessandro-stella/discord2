import createGuild from "database/functions/guilds/createGuild";

export default async (req, res) => {
    const { name, ownerid: ownerId } = req.headers;

    const newGuildData = await createGuild(name, ownerId);

    res.status(newGuildData.status ?? 200).json(newGuildData);
};
