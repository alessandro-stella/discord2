import Channel from "database/models/channelModel";

export default async function getChannels(guildId) {
    const data = Channel.find({ guildId })
        .then((res) => ({
            channels: res.map((channel) => ({
                id: channel._id,
                name: channel.name,
                visibleTo: channel.visibleTo,
            })),
            status: 200,
        }))
        .catch((err) => ({ error: err.message, status: 500 }));

    return data;
}
