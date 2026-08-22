import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

export function ValidateClassSessions(req: Request, res: Response, next: NextFunction): void {
const{Title,Trainer,timeslot,Capacity,Bookingsreservations}=req.body;

if(!Title || typeof Title !=="string"){
      res.status(400).json({ message: "Title is required ." });
    return;
}

if(!Trainer || !mongoose.Types.ObjectId.isValid(Trainer)){
      res.status(400).json({ message: " A Trainer is required and must be a certfied." });
    return;
}

if(!timeslot|| isNaN(Date.parse(timeslot))){
      res.status(400).json({ message: " timeslot required and must be  like this [2026-08-25T18]." });
    return;
}
if(!Capacity ||typeof Capacity!!=="number"|| Capacity <= 0){
      res.status(400).json({ message: " maxCapacity is required and must be a signed." });
    return;
}

next();
}