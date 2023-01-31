import mongoose from "mongoose";

const guildSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        ownerId: {
            type: String,
            required: true,
        },

        roles: {
            type: Array,
            default: [],
        },

        icon: String,
    },
    { timestamps: true }
);

const Guild = mongoose.models.Guild || mongoose.model("Guild", guildSchema);

export default Guild;
