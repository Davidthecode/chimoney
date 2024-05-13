import mongoose from "mongoose";

export const dbConnect = async () => {
  if (process.env.MONGODB_URI !== undefined) {
    try {
      console.log(process.env.MONGODB_URI)
      await mongoose.connect(process.env.MONGODB_URI, );
     
      console.log("Connected to mongodb ")
    } catch (e) {
      console.log("could not connect");
      console.log(e);
    }
  } else {
    console.error("MONGODB_URI is not defined!");
  }
};