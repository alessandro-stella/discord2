import getUserId from "database/functions/authentication/getUserId";

export default async (req, res) => {
    const data = await getUserId(req.headers.email);

    res.status(200).json(data);
};
