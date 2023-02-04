import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    guildId: {
        type: String,
        required: true,
    },

    visibleTo: {
        type: Array,
        default: [],
    },
});

const Channel =
    mongoose.models.Channel || mongoose.model("Channel", channelSchema);

export default Channel;
