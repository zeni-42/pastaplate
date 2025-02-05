import DBconnect from "@/lib/connectDB";
import ResponseHelper from "@/lib/responseHelper";
import { User } from "@/models/User.models";
import mongoose from "mongoose";

export async function POST(req: Request) {
    const { userId } = await req.json();
    try {
        await DBconnect();

        if (userId == "") {
            const users = await User.aggregate([
                {
                    $lookup:{
                        from: "tags",
                        localField: "tags",
                        foreignField: "_id",
                        as: "tags_details"
                    }
                }
            ])
            return ResponseHelper.success(users ,"userId is required", 402)
        } else {
            const user = await User.findById(userId)
            if (!user) {
                return ResponseHelper.error("User not found", 404)
            }

            const userDetails = await User.aggregate([
                {
                    $match: new mongoose.Types.ObjectId(userId),
                },
                {
                    $lookup:{
                        from: "tags",
                        localField: "tags",
                        foreignField: "_id",
                        as: "tags_details"
                    }
                }
            ])
            return ResponseHelper.success(userDetails, "User details", 200)
        }

    } catch (error) {
        console.log(`Somthing went wrong in getUserDetails route`);
        return ResponseHelper.error("Internal server error", 500)
    }
}