import Guild from "database/models/guildModel";
import User from "database/models/userModel";

export default async function checkIsOwner(email, guildId) {
    const promisesResponse = await Promise.allSettled([
        User.findOne({ email }),
        Guild.findById(guildId),
    ]);

    const [userData, guildData] = promisesResponse.map(
        (response) => response.value
    );

    if (promisesResponse.filter((response) => response.value).length !== 2) {
        return { error: true, status: 500 };
    }

    return {
        isOwner: userData._id.toString() === guildData.ownerId,
        status: 200,
    };
}
