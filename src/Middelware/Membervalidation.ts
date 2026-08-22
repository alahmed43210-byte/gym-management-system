import { Request, Response, NextFunction } from "express";
import { UserRole } from "../models/Usersmodel.js";



export function validatemember(req: Request, res: Response, next: NextFunction):void{
const{role,membershiptype,Bookedsession}=req.body;

if(!role|| role!==UserRole.Member){
       res.status(400).json({ message: "role is required and must be a Member." });
    return;
}

if(!membershiptype||typeof membershiptype !=="string"){
       res.status(400).json({ message: "membershiptype is required " });
    return;
}

next();

}
