import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface blogInterface extends Document{
    title: string;
    description: string;
    author: ObjectId;
    content: String;
    tags: string;
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
    },
    tags:{
        type: String,
        required: true,
    }
}, { timestamps: true })

export const Blog = mongoose.models.Blog as mongoose.Model<blogInterface> || mongoose.model<blogInterface>("Blog", blogSchema)