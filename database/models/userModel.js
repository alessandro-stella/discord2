import mongoose from "mongoose";

const generateRandomIdentifier = (chars, len) =>
    "#" +
    [...Array(len)]
        .map((i) => chars[Math.floor(Math.random() * chars.length)])
        .join("");

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        identifier: {
            type: String,
            default: generateRandomIdentifier("0123456789", 4),
        },
        channelsJoined: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true }
);

userSchema.index({ email: 1 }, { unique: true });
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
