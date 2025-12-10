import jwt, { SignOptions, Secret } from "jsonwebtoken";
import "dotenv/config";

const secret_key = process.env.JWT_SECRET_KEY as Secret;

export const generateToken = (userData:any) => {
    const user = {id: userData.id, email: userData.email};
    const expiration: SignOptions = { expiresIn: "1h" };
    return jwt.sign(user, secret_key, expiration);
}