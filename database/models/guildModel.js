import mongoose from "mongoose";

const guildSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    ownerId: {
        type: String,
        required: true,
    },
    icon: String,
});

const Guild = mongoose.models.Guild || mongoose.model("Guild", guildSchema);

export default Guild;
