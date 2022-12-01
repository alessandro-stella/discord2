import User from "database/models/userModel";

export default async function registerUser({ username, email, password }) {
    const userExists = await User.findOne({ email });

    if (userExists) {
        return {
            error: "There's already an account related to the entered email",
        };
    }

    const newUser = await User.create({ username, email, password })
        .then((res) => res)
        .catch((err) => ({
            error: "There's been an error during the registration process, please try again",
        }));

    return {
        username: newUser.username,
        id: newUser._id,
        identifier: newUser.identifier,
        guilds: newUser.guildsJoined,
        error: newUser.error,
    };
}
