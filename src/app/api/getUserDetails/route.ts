import DBconnect from "@/lib/connectDB";
import ResponseHelper from "@/lib/responseHelper";
import { User } from "@/models/User.models";

export async function POST(req: Request) {
    const { userId } = await req.json();
    if (!userId) {
        return ResponseHelper.error("userId is required", 402)
    }

    try {
        await DBconnect();

        const user = await User.findById(userId)
        if (!user) {
            return ResponseHelper.error("User not found", 404)
        }

        const userDetails = await User.findById(userId).select(
            "-password -token -createdAt -updatedAt -__v"
        )
        return ResponseHelper.success(userDetails, "User details", 200)

    } catch (error) {
        console.log(`Somthing went wrong in getUserDetails route`);
        return ResponseHelper.error("Internal server error", 500)
    }
}