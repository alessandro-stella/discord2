import { connect } from "mongoose";

const connectMongo = async (msg) => {
    console.log(`Connecting to MongoDB...`);

    try {
        await connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });

        console.log("Connection established!");

        return { msg: "connected" };
    } catch (e) {
        console.log("Error while establishing the connection!");

        return { msg: "error during connection" };
    }
};

export default connectMongo;
