import connectMongo from "database/connectMongo";
import User from "database/models/userModel";

export default async function registerUser(username, email, password) {
    await connectMongo();

    const newUser = await User.create({ username, email, password })
        .then((res) => ({ user: res }))
        .catch((err) => {
            if (err.message.indexOf("duplicate key error collection") !== -1) {
                return {
                    error: "There's already an account related to the entered email",
                };
            } else {
                return {
                    error: "There's been an error during the registration process, please try again",
                };
            }
        });

    return newUser;
}
