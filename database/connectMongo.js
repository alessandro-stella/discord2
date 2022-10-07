import { connect } from "mongoose";

const connectMongo = async () => {
    console.log("Connecting to MongoDB...");

    const connection = await connect(process.env.MONGO_URI);

    console.log("Connected!");

    return connection;
};

export default connectMongo;
