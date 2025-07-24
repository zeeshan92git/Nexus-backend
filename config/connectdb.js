import mongoose from "mongoose";

const connectdB = async () => {
    await mongoose.connect(`${process.env.MONGODB_URI}/Business-Nexus`);

    console.log("MongoDB connected");
};

export default connectdB;