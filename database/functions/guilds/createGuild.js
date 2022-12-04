import Guild from "database/models/guildModel";
import User from "database/models/userModel";

export default async function createGuild(name, ownerId) {
    const newGuildData = await Guild.create({ name, ownerId })
        .then(async (data) => {
            try {
                let owner = await User.findById(ownerId);

                owner.guildsJoined = [...owner.guildsJoined, data.id];
                owner.markModified("guildsJoined");
                await owner.save();

                return data;
            } catch (e) {
                return {
                    error: "There's been an error during the process, please try again",
                };
            }
        })
        .catch((err) => ({
            error: "There's been an error during the process, please try again",
        }));

    return newGuildData.id
        ? { id: newGuildData._id, name }
        : { error: newGuildData.error };
}
