import { connect } from "mongoose";

const connectMongo = async () => {
    console.log("Connecting to MongoDB...");

    await connect(process.env.MONGO_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });

    console.log("Connected!");
};

export default connectMongo;
