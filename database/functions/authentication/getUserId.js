import User from "database/models/userModel";

export default async function getUserId(email) {

    const userId = await User.findOne({ email })
        .then((res) => res._id.toString())
        .catch((err) => null);

    return userId;
}
