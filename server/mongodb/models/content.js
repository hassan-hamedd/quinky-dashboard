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
    contentCategory: {
        type: String,
        required: true,
    },
    coverImage: {
        type: String,
        required: true,
    },
    introTextOne: {
        type: String,
        required: true,
    },
    introTextTwo: {
        type: String,
        required: true,
    },
    cards: {
        type: [{
            // Fields not specific to a card type
            cardType: {
                type: String,
                required: true
            },
            title: {
                type: String
            },
            // Fields for the titleAndList card type
            listImage: {
                type: String,
            },
            listItems: {
                type: [String],
                required: false,
                default: null
            },
            // Fields for the titleAndParagraph card type
            tag: {
                type: String,
            },
            paragraph: {
                type: String,
            },
            emojis: {
                type: String,
            },
            paragraphFontWeight: {
                type: String,
            },
            // Fields for the tipsAndPrecautions card type
            tipOneText: {
                type: String,
            },
            tipOneImage: {
                type: String,
            },
            tipTwoText: {
                type: String,
            },
            tipTwoImage: {
                type: String,
            }
        }],
    },
    spiciness: {
        type: Number,
        required: true,
    },
    tags: {
        type: [String],
        required: true,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

const contentModel = mongoose.model("Content", ContentSchema, "games");

export default contentModel;