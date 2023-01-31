import { Schema, model } from "mongoose";

const channelSchema = new Schema({
    guildId: {
        type: String,
        required: true,
    },

    name: {
        type: String,
        required: true,
    },

    visibleTo: {
        type: Array,
        default: [],
    },
});

const Channel = model("channel", channelSchema);

export default Channel;
