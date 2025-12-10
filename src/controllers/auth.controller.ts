import { NextFunction, Request, Response } from "express";
import { generateToken } from "../utils/token-generator";

const default_user = {
    id: 1,
    email: "user@email.com",
    password: "strongPass123"
}

export const login = async(req:Request, res:Response, next:NextFunction) => {
    
}