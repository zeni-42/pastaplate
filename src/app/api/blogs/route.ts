import DBconnect from "@/lib/connectDB";
import ResponseHelper from "@/lib/responseHelper";
import { Blog } from "@/models/Blog.models";
import mongoose from "mongoose";

export async function POST(req: Request) {
    const { blogId } = await req.json()

    try {
        await DBconnect();

        if (blogId == "") {
            const allBlogs = await Blog.aggregate([
                {
                    $lookup:{
                        from: "users",
                        localField: "author",
                        foreignField: "_id",
                        as: "author_details"
                    }
                },
                {
                    $addFields:{
                        author_details: {
                            $first: "$author_details",
                        }
                    }
                },
                {
                    $project: {
                        "author_details.password": 0,
                        "author_details.token": 0,
                        "author_details.liked": 0,
                        "author_details.saved": 0,
                        "author_details.createdAt": 0,
                        "author_details.updatedAt": 0,
                        "author_details.__v": 0
                    }
                }
            ])

            return ResponseHelper.success(allBlogs, "All blogs details", 200)

        } else {
            const blogWithId = await Blog.findById(blogId)
            if (!blogWithId) {
                return ResponseHelper.error("Blog does not exit", 404)
            }

            const blogData = await Blog.aggregate([
                {
                    $match: {
                        _id: new mongoose.Types.ObjectId(blogId)
                    }
                },
                {
                    $lookup:{
                        from:"users",
                        localField: "author",
                        foreignField:"_id",
                        as: "author_details"
                    }
                },
                {
                    $addFields:{
                        author_details: {
                            $first: "$author_details"
                        }
                    }
                },
                {
                    $project: {
                        "author_details.password": 0,
                        "author_details.token": 0,
                        "author_details.liked": 0,
                        "author_details.createdAt": 0,
                        "author_details.updatedAt": 0,
                        "author_details.__v": 0
                    }
                }
            ])

            return ResponseHelper.success(blogData, "Blog detail", 200)
        }
    } catch (error) {
        console.log("Somthing went wrong in blogs route");
        return ResponseHelper.error("Internal server error", 500, error)
}}