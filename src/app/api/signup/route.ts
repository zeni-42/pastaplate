import DBconnect from "@/lib/connectDB"
import { generateToken } from "@/lib/generateToken";
import ResponseHelper from "@/lib/responseHelper"
import { User } from "@/models/User.models";
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
    const { fullName, userName, password } = await req.json()
    if (!fullName || !userName || !password) {
        return ResponseHelper.error("All fields are required", 401)
    }

    try {
        await DBconnect();

        const existingUser = await User.findOne({ userName })
        if (existingUser) {
            return ResponseHelper.error("This username is taken", 403)
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const createdToken = generateToken(fullName, userName, hashedPassword)

        const user = await User.create({
            fullName,
            userName,
            password: hashedPassword,
            token: createdToken
        })

        const createdUser = await User.findById(user._id).select(
            "-token -password -__v -createdAt -updatedAt"
        )
        if (!createdUser) {
            return ResponseHelper.error("Error creating user", 405)
        }

        return ResponseHelper.success(createdUser, "User registered successfully")

    } catch (error) {
        console.log(`Somthing went wrong in signup route`);
        return ResponseHelper.error("Internal server error", 500, error)
    }
}