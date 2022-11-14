import Message from "database/models/messageModel";

export default async function getMessages(req, res) {
    let resMessages,
        guildId = req.head.guildId;

    await Message.find({ guildId })
        .then((messages) => {
            resMessages = messages;
        })
        .catch((err) => (resMessages = []));

    res.status(200).json({ resMessages });
}
