import { Request, Response, NextFunction } from "express";
import { UserRole } from "../models/Usersmodel.js";
import jwt from "jsonwebtoken";


export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: UserRole;
  };
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        message: "Authentication required: Missing or malformed token",
      });
      return;
    }

    const token = authHeader.split(" ")[1];
    if(!token){
    res.status(401).json({
   success:false,
    message :"Authentication required :Missing token",
    });
   return;
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const decoded = jwt.verify(token, secret) as unknown as {
      userId: string;
      role: UserRole;
    };

    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({
        success: false,
        message: "Token has expired",
      });
      return;
    }

    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({
        success: false,
        message: "Invalid token",
      });
      return;
    }


    res.status(500).json({
      success: false,
      message: "Internal server error during authentication",
    });
    return;
  }
};
