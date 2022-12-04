import findUser from "database/functions/authentication/findUser";

export default async (req, res) => {
    const data = await findUser(req.headers.userid);
    
    res.status(200).json(data);
};
