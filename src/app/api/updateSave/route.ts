import DBconnect from "@/lib/connectDB";
import ResponseHelper from "@/lib/responseHelper"
import { Blog } from "@/models/Blog.models";
import { User } from "@/models/User.models";

export async function POST(req: Request) {
    const {userId, blogId} = await req.json()
    if (!userId || !blogId) {
        return ResponseHelper.error("All fields are required")
    }

    try {
        await DBconnect();

        const blog = await Blog.findById(blogId)
        if (!blog) {
            return ResponseHelper.error("Blog does not exits", 404)
        }

        const user = await User.findById(userId)
        if (!user) {
            return ResponseHelper.error("User does not exist", 404)
        }

        const alreadySaved = user.saved.includes(blogId)

        const updateUser = await User.findByIdAndUpdate(
            userId,
            alreadySaved ? {
                $pull: { saved: blogId }
            } : {
                $addToSet :{ saved: blogId }
            }
        )

        const message = alreadySaved ? "Remove from saves" : "Saved"

        return ResponseHelper.success(updateUser, message, 200)
    } catch (error) {
        console.log("Somthing went wrong in updateSave route");
        return ResponseHelper.error("Internal server error", 500, error)
    }
}