import DBconnect from "@/lib/connectDB"
import ResponseHelper from "@/lib/responseHelper"
import { Blog } from "@/models/Blog.models"

export async function POST(req: Request) {
    const { title, description, content, userId } = await req.json()
    if (!title || !description || !content) {
        return ResponseHelper.error("All fields are required", 400)
    }

    if (!userId) {
        return ResponseHelper.error("userId is missing", 405)
    }

    try {
        await DBconnect();

        const existingBlog = await Blog.findOne({ title })
        if (existingBlog){
            return ResponseHelper.error("The title should be unique")
        } 

        const blog = await Blog.create({
            title,
            description,
            content,
            author: userId,
            imageUrl:"deno.url"
        })
        return ResponseHelper.success(blog, "Blog registed", 200)
    } catch (error) {
        console.log('Somthing went wrong in create-post route');
        return ResponseHelper.error("Internal server error", 500, error)
    }
}