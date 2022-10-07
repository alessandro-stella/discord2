import Message from "database/models/messageModel";

export default async function getMessages(req, res) {

    
    let resMessages;

    await Message.find({})
        .then((messages) => {
            resMessages = messages;
        })
        .catch((err) => (resMessages = []));

    res.status(200).json({ resMessages });
}
