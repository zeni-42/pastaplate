import mongoose,{ Document, ObjectId, Schema } from "mongoose";

export interface tagsInterface extends Document {
    title: string
    usedBy: ObjectId[]
}

const tagSchema: Schema<tagsInterface> = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        max: 40
    },
    usedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
    }]
}, { timestamps: true })

export const Tags = mongoose.models.Tags as mongoose.Model<tagsInterface> || mongoose.model<tagsInterface>("Tags", tagSchema)