import Guild from "database/models/guildModel";
import Channel from "database/models/channelModel";
import User from "database/models/userModel";

async function removeGuildFromUsers(guildId) {
    const users = await User.find({ guildsJoined: guildId });
    let errors = 0;

    for (const user of users) {
        let error = false;

        do {
            try {
                user.guildsJoined = user.guildsJoined.filter(
                    (guild) => guild !== guildId
                );
                user.markModified("guildsJoined");
                await user.save();
            } catch (e) {
                error = true;
                errors++;
            }
        } while (error);
    }

    return { done: true, errors };
}

export default async function deleteGuild(guildId) {
    const promisesResponse = await Promise.allSettled([
        Guild.findByIdAndDelete(guildId),
        Channel.deleteMany({ guildId }),
        // DELETE MESSAGES
        removeGuildFromUsers(guildId),
    ]);

    if (promisesResponse.filter((response) => response.value).length !== 3) {
        return { error: true, status: 500 };
    }

    return { id: guildId, status: 200 };
}
