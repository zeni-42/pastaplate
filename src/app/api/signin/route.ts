import DBconnect from "@/lib/connectDB"
import ResponseHelper from "@/lib/responseHelper"
import { User } from "@/models/User.models"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"

export async function POST(req:Request) {
    const { userName, password } = await req.json()
    if (!userName || !password) {
        return ResponseHelper.error("All fields are required", 401)
    }

    try {
        await DBconnect();

        const user = await User.findOne({ userName })
        if (!user) {
            return ResponseHelper.error("User not found", 404)
        }

        const isValidPassowrd = await bcrypt.compare(password, user.password)
        if (!isValidPassowrd) {
            return ResponseHelper.error("Invalid credentials", 400)
        }

        const loggedInUser = await User.findById(user._id).select(
            "-token -password -__v -createdAt -updatedAt"
            )

        const ck = await cookies()
        ck.set("token", user.token)

        return ResponseHelper.success(loggedInUser, "User logged in", 200)
    } catch (error) {
        console.log(`Somthing went wrong in signin route`);
        return ResponseHelper.error("Internal server error", 500)
    }
}