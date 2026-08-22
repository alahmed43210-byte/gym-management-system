import { Request, Response, NextFunction } from "express";
import { Bookingstatus } from "../models/Bookingsmodel.js";
import mongoose from "mongoose";

export function validatebooking(req: Request, res: Response, next: NextFunction): void {
  const { Session, Member, Status } = req.body;

  if (!Session ||  !mongoose.Types.ObjectId.isValid(Session) ) {
    res.status(400).json({ message: "Session is required." });
    return;
  }

  if (!Member|| !mongoose.Types.ObjectId.isValid(Member)) {
    res.status(400).json({ message: "Member is required." });
    return;
  }

  if (!Status || !Object.values(Bookingstatus).includes(Status)) {
    res.status(400).json({ 
      message: "Status is required and must be one of [booked, cancelled, notbooked]." 
    });
    return;
  }

  next();
}