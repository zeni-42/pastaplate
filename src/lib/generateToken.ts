import jwt from "jsonwebtoken"
import crypto from "crypto"

export const generateToken = (fullName: string, userName: string, password: string) => {
    const secret = process.env.TOKEN_SECRET;
    if (!secret) {
        console.log(`Token not found`);
        process.exit(1)
    }

    const token = jwt.sign(
        { 
            fullName, userName, password
        },
        secret,
        {
            expiresIn: process.env.TOKEN_EXPIRY
        }
    )

    const hashedToken = crypto.createHash("sha256").update(token).digest("base64url")
    console.log(hashedToken);
    return hashedToken;
}