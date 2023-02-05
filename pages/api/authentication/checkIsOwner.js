import checkIsOwner from "database/functions/authentication/checkIsOwner";

export default async (req, res) => {
    const { guildid: guildId, email } = req.headers;

    const data = await checkIsOwner(email, guildId);

    res.status(data.status).json(data);
};
