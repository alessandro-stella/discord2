import Message from "database/models/messageModel";

export default async function getMessages(req, res) {
    let resMessages, channelId = req.head.channelId;

    await Message.find({ channelId })
        .then((messages) => {
            resMessages = messages;
        })
        .catch((err) => (resMessages = []));

    res.status(200).json({ resMessages });
}
