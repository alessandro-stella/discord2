import { Schema, model } from "mongoose";
import Crypto from "crypto";

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            validate: [validatePassword, "The password's length is not valid"],
        },
        username: {
            type: String,
            required: true,
        },
        identifier: {
            type: String,
            default: generateIdentifier(),
        },
        channelsJoined: {
            type: Array,
            default: [],
            validate: [arrayLimit, "You are in too much channels"],
        },
    },
    { timestamps: true }
);

function generateIdentifier() {
    const code = Crypto.randomInt(0, 1000000).toString().padStart(4, "0");

    return `#${code}`;
}

function arrayLimit(val) {
    return val.length <= 100;
}

function validatePassword(val) {
    return val.length >= 8 && val.length <= 16;
}

userSchema.index({ username: 1, identifier: 1 }, { unique: true });

const User = model("user", userSchema);

export default User;
