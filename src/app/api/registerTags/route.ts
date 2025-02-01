import DBconnect from "@/lib/connectDB"
import ResponseHelper from "@/lib/responseHelper"
import { Tags } from "@/models/tags.models";
import { User } from "@/models/User.models";

export async function POST(req: Request) {
    const { title, userId, isPredefined } = await req.json()
    if (!title || !userId || !isPredefined ) {
        return ResponseHelper.error("All fields are reuired", 400)
    }

    try {
        await DBconnect();

        const existingTag = await Tags.findOne({ title })
        if (existingTag) {
            return ResponseHelper.error("This tag already exit", 403)
        }

        const validUser = await User.findById(userId)
        if (!validUser) {
            return ResponseHelper.error("This user does not exist", 404)
        }

        const tags = await Tags.create({
            title,
            createdBy: userId,
            isPredefined,
        })

        const newTag = await Tags.findById(tags._id).select(
            "-craetedBy"
        )
        if (!newTag) {
            return ResponseHelper.error("Failed to add tag");
        }

        return ResponseHelper.success(newTag, "Tag added", 200)

    } catch (error) {
        console.log("Somthing went wrong in registerTags route");
        return ResponseHelper.error("Internal server error", 500, error)
    }
}