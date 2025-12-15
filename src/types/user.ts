import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface LoginCredentials {
    email: string;
    password: string
}

export interface JwtUserPayload extends JwtPayload {
    id: string;
    email: string;
}

export interface AuthTokenResponse {
    message: string;
    token: string;
}

export interface AuthRequest extends Request {
    user?: JwtUserPayload;
}

