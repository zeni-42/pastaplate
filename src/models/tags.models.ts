import mongoose,{ Document, ObjectId, Schema } from "mongoose";

export interface tagsInterface extends Document {
    title: string
    usedBy: ObjectId[],
    createdBy: ObjectId,
    isPredefined: boolean,
    isHot: boolean,
}

const tagSchema: Schema<tagsInterface> = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        max: 40,
        unique: true
    },
    usedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
    }],
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    isPredefined: {
        type: Boolean,
        required: true,
        default: false,
    },
    isHot:{
        type: Boolean,
        required: true,
        default: false,
    }
}, { timestamps: true })

export const Tags = mongoose.models.Tags as mongoose.Model<tagsInterface> || mongoose.model<tagsInterface>("Tags", tagSchema)