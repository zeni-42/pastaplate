import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface userInterface extends Document{
    fullName: string;
    userName: string;
    password: string;
    avatar: string;
    bio: string;
    favorites: ObjectId[];
    saved: ObjectId[]
    token: string;
}

const userSchema: Schema<userInterface> = new mongoose.Schema({
    fullName:{
        type: String,
        required: true,
        index: true,
        trim: true,
    },
    userName:{
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true,
        lowercase: true,
    },
    password:{
        type: String,
        required: true,
        index: true,
    },
    avatar:{
        type: String,
        index: true,
        default: "https://res.cloudinary.com/dfbtssuwy/image/upload/v1735838884/ljziqvhelksqmytkffj9.jpg"
    },
    bio:{
        type: String,
        max: 200,
        min: 0
    },
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
        index: true
    }],
    saved: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
        index: true
    }],
    token:{
        type: String,
        required: true
    }
}, { timestamps: true })

export const User = mongoose.models.User as mongoose.Model<userInterface> || mongoose.model<userInterface>("User", userSchema)