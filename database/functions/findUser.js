import User from "database/models/userModel";

export default async function findUser(email, password, isRegistering) {
    if (email === "a") {
        return { user: { email: "Alessandro...", username: "Noh" } };
    }

    return { error: "Wrong password" };
}
