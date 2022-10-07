import { Schema, model } from "mongoose";

const messageSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
        },

        channelId: {
            type: String,
            required: true,
        },

        content: {
            type: String,
            default: "",
        },

        embeds: {
            type: Array,
            default: [],
        },

        components: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true }
);

const Message = model("message", messageSchema);

export default Message;
