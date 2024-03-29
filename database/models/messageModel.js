import { Schema, model } from "mongoose";

const messageSchema = new Schema(
    {
        authorId: {
            type: String,
            required: true,
        },

        channelId: {
            type: String,
            required: true,
        },

        content: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Message = model("message", messageSchema);

export default Message;
