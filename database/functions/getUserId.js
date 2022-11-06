import connectMongo from "database/connectMongo";
import User from "database/models/userModel";

export default async function getUserId(email) {
    await connectMongo();

    const userId = await User.findOne({ email })
        .then((res) => res._id.toString())
        .catch((err) => null);

    return userId;
}
