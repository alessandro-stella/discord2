import Channel from "database/models/channelModel";

export default async function createChannel(name, guildId) {
    const newChannelData = await Channel.create({ name, guildId })
        .then((res) => ({
            channel: { name, id: res._id, visibleTo: [] },
            status: 200,
        }))
        .catch((err) => ({
            error: "There's been an error during the process, please try again",
            status: 500,
        }));

    return newChannelData;
}
