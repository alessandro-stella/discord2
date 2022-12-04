import User from "database/models/userModel";

export default async function findUser(userId) {
    const userData = await User.findOne({ _id: userId })
        .then((res) => res)
        .catch((err) => ({
            error: "There's been an error during the process, please try again",
        }));

    return {
        username: userData.username,
        id: userData._id,
        identifier: userData.identifier,
        guilds: userData.guildsJoined,
        error: userData.error,
    };
}
