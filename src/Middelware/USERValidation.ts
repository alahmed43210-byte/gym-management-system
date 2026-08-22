import { Request, Response, NextFunction } from "express";
import { UserRole } from "../models/Usersmodel.js";

export function validateuser(req: Request, res: Response, next: NextFunction):void{
 const {Full_Name, Email,Password,role } = req.body;

if(!Full_Name || typeof Full_Name!=="string"){
      res.status(400).json({ message: "FULLNAME is required ." });
    return;
}

if(!Email || typeof Email!=="string"){
       res.status(400).json({ message: "Email is required " });
    return;
}

if(!Password||typeof Password!=="string"){
       res.status(400).json({ message: "password is required " });
    return;
}

if(!role||!Object.values(UserRole).includes(role)){
       res.status(400).json({ message: "role is required and must be an usertype of[Member or Trainer]." });
    return;
}   
next();
}