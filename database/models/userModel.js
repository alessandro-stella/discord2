import mongoose from "mongoose";
import bcrypt from "bcrypt";
const SALT_WORK_FACTOR = 16;

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            index: { unique: true },
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
            default: "",
        },
        guildsJoined: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true }
);

userSchema.pre("save", async function save(next) {
    if (!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        this.password = await bcrypt.hash(this.password, salt);

        let code = Math.floor(Math.random() * 1000000).toString();
        while (code.length < 6) code = "0" + code;
        this.identifier = "#" + code;

        return next();
    } catch (err) {
        return next(err);
    }
});

userSchema.methods.validatePassword = async function validatePassword(data) {
    return bcrypt.compare(data, this.password);
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
