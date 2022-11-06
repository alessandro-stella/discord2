import getUserId from "database/functions/getUserId";

const myFunction = async (req, res) => {
    const data = await getUserId(req.headers.email);
    res.status(200).json(data);
};

export default myFunction;
