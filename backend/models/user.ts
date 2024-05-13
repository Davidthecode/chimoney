import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    userSubId: {
        type: String,
        required: true
    }
});

const usermodel = models.User || model("User", userSchema);

export default usermodel;