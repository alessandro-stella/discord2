import User from "database/models/userModel";

export default async function verifyUser({ email, password }) {
    const userData = await User.findOne({ email })
        .then(async (user) => {
            if (!user) {
                return {
                    error: "There's no account related to the provided email",
                };
            }

            const verified = await user.validatePassword(password);

            if (verified) {
                return user;
            } else {
                return { error: "Wrong password" };
            }

            return { username: "Palla", _id: "tets", identifier: "Negro" };
        })
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
