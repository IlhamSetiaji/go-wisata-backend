import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import ResponseFormatter from "../helpers/ResponseFormatter";
import { PrismaClient } from "@prisma/client";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const prisma = new PrismaClient();
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            throw new Error("Authorization header is required");
        }
        const token = authorizationHeader.split(" ")[1];
        if (!token) {
            throw new Error("Token is required");
        }
        const decoded = jwt.verify(token, 'secretStringForJWT') as JwtPayload;
        const user = await prisma.user.findUnique({
            where: {
                email: decoded.email
            }
        });
        if (!user) {
            throw new Error("User not found");
        }
        req.body.user = user;
        next();
    } catch (error: any) {
        return ResponseFormatter.error(res, error.message);
    }
}