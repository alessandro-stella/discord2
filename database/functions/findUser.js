import User from "database/models/userModel";

export default async function findUser(email, password) {
    if (email === "a") {
        return { user: { email: "Alessandro...", username: "oasijdaoisjd" } };
    }

    return null;
}
