import connectMongo from "database/connectMongo";

export default async (req, res) => {
    const result = await connectMongo();

    res.status(200).json(result);
};
