import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface blogInterface extends Document{
    title: string;
    description: string;
    author: ObjectId;
    content: String;
    tags: string[];
    points: ObjectId[];
    isActive: boolean;
    isPublic: boolean;
    imageUrl: string;
}

const blogSchema: Schema<blogInterface> = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        index: true,
        trim: true,
    },
    description:{
        type: String,
        required: true,
        max: 150,
        min: 10,
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
    content:{
        type: String,
        index: true,
        required: true
    },
    tags:[{
        type: String,
        required: true,
    }],
    points:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    }],
    isActive:{
        type: Boolean,
        default: true
    },
    isPublic:{
        type: Boolean,
        default: true
    },
    imageUrl: {
        type: String,
        required: true
    }
}, { timestamps: true })

export const Blog = mongoose.models.Blog as mongoose.Model<blogInterface> || mongoose.model<blogInterface>("Blog", blogSchema)