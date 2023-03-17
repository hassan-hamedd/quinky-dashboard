import mongoose from "mongoose";

const CardSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    paragraphTitle: {
      type: String,
      required: true
    },
    paragraph: {
      type: String,
      required: true
    }
});
  
const InfoStack = new mongoose.Schema({
    cards: {
      type: [CardSchema],
      required: true
    },
    checkpoint: {
      type: String,
      required: true
    }
  });

const ContentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    contentCategory: {
        type: String,
        required: true,
    },
    contentCategory: {
        type: String,
        required: true,
    },
    introCards: {
        cards: [
          {
            title: {
              type: String,
              required: true
            },
            paragraph: {
              type: String,
              required: true
            }
          }
        ],
        checkpoint: {
          type: String,
          required: true
        }
    },
    infoStacks: [
        InfoStack
    ],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

const contentModel = mongoose.model("LearningContent", ContentSchema, "learning_content");

export default contentModel;