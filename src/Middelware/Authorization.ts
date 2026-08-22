
import {  Response, NextFunction } from "express";
import { UserRole } from "../models/Usersmodel.js";
import { AuthRequest } from "./Authentication.js";

export const authorize = (...allowedRoles: UserRole[]) => {
  return (req:AuthRequest , res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Not authenticated." });
    }

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: "You don't have permission to do this." });
    }

    next();
  };
};