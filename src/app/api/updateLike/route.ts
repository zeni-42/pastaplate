import DBconnect from "@/lib/connectDB"
import ResponseHelper from "@/lib/responseHelper"
import { Blog } from "@/models/Blog.models";
import { User } from "@/models/User.models";

export async function POST(req: Request) {
    const { userId, blogId } = await req.json()
    if (!userId || !blogId) {
        return ResponseHelper.error("All fields are required", 400)
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

        const alreadyLiked = blog.points.includes(userId)

        const updatedBlog = await Blog.findByIdAndUpdate(
            blogId,
            alreadyLiked ? {
                $pull: { points: userId }
            } : {
                $addToSet: { points: userId }
            }
        )

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            alreadyLiked ? {
                $pull: { liked: blogId }
            } : {
                $addToSet: { liked: blogId }
            }
        )
        if (!updatedBlog) {
            return ResponseHelper.error("Like exist", 403)
        }

        const message = alreadyLiked ? "Like removed" : "Liked"

        return ResponseHelper.success(updatedBlog, message, 200)

    } catch (error) {
        console.log("Somthing went wrong in the updateLike route")
        return ResponseHelper.error("Internal server error", 500, error)
    }
}