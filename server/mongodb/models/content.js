import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    contentType: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

const contentModel = mongoose.model("Content", ContentSchema, "content");

export default contentModel;