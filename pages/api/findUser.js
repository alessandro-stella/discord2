import findUser from "database/functions/findUser";

const myFunction = async (req, res) => {
    const data = await findUser(req.headers.userid);
    res.status(200).json(data);
};

export default myFunction;
