import createGuild from "database/functions/createGuild";

export default async (req, res) => {
    const { name, ownerid: ownerId } = req.headers;

    const newGuildData = await createGuild(name, ownerId);

    res.status(200).json(newGuildData);
};
