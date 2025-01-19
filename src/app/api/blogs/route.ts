import DBconnect from "@/lib/connectDB";
import ResponseHelper from "@/lib/responseHelper";
import { Blog } from "@/models/Blog.models";

export async function POST(req: Request) {
    const { blogId } = await req.json()

    try {
        await DBconnect();

        if (blogId == "") {
            const allBlogs = await Blog.find().select(
                "-__v -isActive"
            )
            return ResponseHelper.success(allBlogs, "Blogs details", 200)
        } else {
            const blogWithId = await Blog.findById(blogId)
            if (!blogWithId) {
                return ResponseHelper.error("Blog does not exit", 404)
            }

            const blogData = await Blog.findById(blogWithId._id).select(
                "-__v -isActive"
            )
            return ResponseHelper.success(blogData, "Blog detail", 200)
        }
    } catch (error) {
        console.log("Somthing went wrong in blogs route");
        return ResponseHelper.error("Internal server error", 500, error)
}}