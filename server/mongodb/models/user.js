import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    allContent: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Content",
    }]
});

const userModel = mongoose.model("User", UserSchema, "dashboard_users");

export default userModel;