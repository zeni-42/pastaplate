import ResponseHelper from "@/lib/responseHelper"
import { Blog } from "@/models/Blog.models"
import { User } from "@/models/User.models"

export async function POST(req: Request) {
    const { userId, blogId } = await req.json()
    console.log([userId, blogId]);
    
    if (!userId || !blogId) {
        return ResponseHelper.error("All fields are required", 400)
    }

    try {
        const user = await User.findById(userId)
        if (!user) {
            return ResponseHelper.error("User not found", 404)
        }

        const blog = await Blog.findById(blogId)
        if (!blog) {
            return ResponseHelper.error("Blog not found", 404)
        }

        const superUser = await User.findById(blog.author)
        if (!superUser) {
            return ResponseHelper.error("This user does not exist", 450)
        }

        const updatedUser =  await User.findByIdAndUpdate(superUser._id, {
            $push: { followers: userId }
        })

        return ResponseHelper.success(updatedUser, "Follower added", 200)
    } catch (error) {
        console.log("Somthing went wrong in the addFollower route");
        return ResponseHelper.error("Internal server error", 500)
    }
}