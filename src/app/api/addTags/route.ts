import ResponseHelper from "@/lib/responseHelper"
import { Tags } from "@/models/tags.models"
import { User } from "@/models/User.models"

export async function POST(req: Request) {
    const { tagId, userId } = await req.json()
    if (!tagId || !userId) {
        return ResponseHelper.error("TagId is required", 400)
    }

    try {
        const user = await User.findById(userId)
        if (!user) {
            return ResponseHelper.error("This user does not exist", 404)
        }

        const tag = await Tags.findById(tagId)
        if (!tag) {
            return ResponseHelper.error("This tag does not exist", 404)
        }

        const existingTag = user.tags.includes(tagId)
        if (existingTag) {
            return ResponseHelper.error("Tag already exist", 400)
        }

        const updatedUser = await User.findByIdAndUpdate(userId, 
            { $addToSet: { tags: tagId } },
            { new: true, select: " -password -createdAt -updatedAt -token -__v" }
        )

        return ResponseHelper.success(updatedUser, "Tags added", 200)
    } catch (error) {
        console.log("Somthing went wrong in addTag route");
        return ResponseHelper.error("Internal server error", 500, error)
    }
}