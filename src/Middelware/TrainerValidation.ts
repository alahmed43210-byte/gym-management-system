import { Request, Response, NextFunction } from "express";
import { UserRole } from "../models/Usersmodel.js"; 


export function ValidateTrainer(req: Request, res: Response, next: NextFunction): void {
const{role,specialization,experiencetime,presentedsessions}=req.body;

if(!role || role!==UserRole.Trainer){
      res.status(400).json({ message: "role is required and must be a Trainer." });
    return;
}

if(!specialization||typeof specialization!=="string"){
      res.status(400).json({ message: " specializationis required and must be a certfied." });
    return;
}

if(!experiencetime||typeof experiencetime!=="number" || experiencetime<1){
      res.status(400).json({ message: " experiencetime required and must not less than a year" });
    return;
}
next();
}