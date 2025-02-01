import DBconnect from "@/lib/connectDB";
import ResponseHelper from "@/lib/responseHelper";
import { Tags } from "@/models/tags.models";
import mongoose from "mongoose";

export async function POST(req: Request) {
    const { tagId } = await req.json()
    try {
        await DBconnect();
        if (tagId == "") {
            const allTags = await Tags.aggregate([
                {
                    $lookup: {
                        from: "users",
                        localField: "createdBy",
                        foreignField: "_id",
                        as: "user_details",
                    }
                },
                {
                    $addFields: {
                        user_details: {
                            $first: "$user_details",
                        }
                    }
                },
                {
                    $project: {
                        "user_details.password": 0,
                        "user_details.token": 0,
                        "user_details.liked": 0,
                        "user_details.createdAt": 0,
                        "user_details.updatedAt": 0,
                        "user_details.__v": 0
                    }
                }
            ])

            return ResponseHelper.success(allTags, "All Tags data", 200)
        } else {
            const tagWithId = await Tags.findById(tagId)
            if (!tagWithId) {
                return ResponseHelper.error("Tag does not exist", 404)
            }

            const tagData = await Tags.aggregate([
                {
                    $match: {
                        _id: new mongoose.Types.ObjectId(tagId)
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "craetedBy",
                        foreignField: "_id",
                        as: "user_details",
                    }
                },
                {
                    $addFields: {
                        user_details: {
                            $first: "$user_deails",
                        }
                    }
                },
                {
                    $project: {
                        "user_data.password": 0,
                        "user_data.token": 0,
                        "user_data.liked": 0,
                        "user_data.createdAt": 0,
                        "user_data.updatedAt": 0,
                        "user_data.__v": 0
                    }
                }
            ])

            return ResponseHelper.success(tagData, "Tag details", 200)
        }
    } catch (error) {
        console.log("Somthing went wrong in the tags route");
        return ResponseHelper.error("Internal aserver error", 500, error)
    }
}