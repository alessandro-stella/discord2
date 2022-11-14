import createGuild from "database/functions/createGuild";

export default async (req, res) => {
    const name = req.headers.name;
    const ownerId = req.headers.ownerid;

    const newGuildData = await createGuild(name, ownerId);

    res.status(200).json(newGuildData);
};
