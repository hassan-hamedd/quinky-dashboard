import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

import LearningContent from "../mongodb/models/learningContent.js";
import Content from "../mongodb/models/content.js";
import User from "../mongodb/models/user.js";

const getAllContent = async (req, res) => {
    const { _end, _order, _start, _sort, title_like = "", contentCategory = "" } = req.query;

    const query = {};

    if(contentCategory !== "") {
        query.contentCategory = contentCategory;
    }

    if(title_like !== "") {
        query.title = { $regex: title_like, $options: "i" };
    }

    try {
        const count = await LearningContent.countDocuments({ query });

        const content = await LearningContent
            .find(query)
            .limit(_end)
            .skip(_start)
            .sort({ [_sort]: _order });

        res.set("X-Total-Count", count);
        res.header("Access-Control-Expose-Headers", "X-Total-Count");

        res.status(200).json(content);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getContentDetail = async (req, res) => {
    const { id } = req.params;
    const contentExists = await LearningContent.findOne({ _id: id }).populate("creator");

    if (contentExists) {
        res.status(200).json(contentExists);
    } else { 
        res.status(404).json({ message: "Content not found" });
    }
};

const createContent = async (req, res) => {
    try {
        const { email, title, contentCategory, introCards, infoStacks } = req.body;
    
        // Start a new session...
        const session = await mongoose.startSession();
        session.startTransaction();
    
        const user = await User.findOne({ email }).session(session);
    
        if (!user) throw new Error("User not found");
    
        const newLearningContent = await LearningContent.create({
            title,
            contentCategory,
            introCards,
            infoStacks,
            creator: user._id,
        });
    
        user.allContent.push(newLearningContent._id);
        await user.save({ session });
    
        await session.commitTransaction();
    
        res.status(200).json({ message: "Content created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateContent = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, contentType, photo } = req.body;

        const photoUrl = await cloudinary.uploader.upload(photo);

        await Content.findByIdAndUpdate({ _id: id }, { title, description, contentType, photo: photoUrl.url || photo });
        
        res.status(200).json({ message: "Content updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteContent = async (req, res) => {
    try {
        const { id } = req.params;

        const contentToDelete = await LearningContent.findById({ _id: id }).populate("creator");

        if(!contentToDelete) throw new Error("Content not found");
        

        const session = await mongoose.startSession();
        session.startTransaction();

        contentToDelete.deleteOne({ session });
        contentToDelete.creator.allContent.pull(contentToDelete);

        await contentToDelete.creator.save({ session });
        await session.commitTransaction();

        res.status(200).json({ message: "Content deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    getAllContent,
    getContentDetail,
    createContent,
    updateContent,
    deleteContent,
};
