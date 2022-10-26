import {Schema, model, models} from "mongoose";
import Crypto from "crypto";

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
        },
        password: String,
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
        },
    },
    { timestamps: true }
);

function generateIdentifier() {
    const code = Crypto.randomInt(0, 1000000).toString().padStart(4, "0");

    return `#${code}`;
}

userSchema.index({ username: 1, identifier: 1 }, { unique: true });

const User = models.verifiedUsers || model("verifiedUsers", userSchema, "verifiedUsers");

export default User;
