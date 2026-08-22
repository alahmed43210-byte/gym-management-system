import { Request,Response } from "express";
import { AuthRequest } from "../Middelware/Authentication.js";
import ClassSession from "../models/Sessionsmodel.js";
import Bookings from "../models/Bookingsmodel.js";
import { Bookingstatus } from "../models/Bookingsmodel.js";
//getavailablesessions()

export const getAvailableSessions = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const userId = user.userId;
 if (!userId) {
      return res.status(400).json({ message: "User ID is missing from request" });
    }

    const userBookings = await Bookings.find({ 
      Member: userId, 
      Status: Bookingstatus.booked 
    }).select("Session");
    
    const bookedSessionIds = userBookings.map((booking) => booking.Session.toString());

   
    const futureSessions = await ClassSession.find({
      timeslot: { $gt: new Date() },
      status: { $ne: "cancelled" }, 
    }).populate("Trainer", "name email specialization");

    const availableSessions = futureSessions.filter((session) => {
      const currentBookings = session.Bookingsreservations?.length || 0;
      const isFull = currentBookings >= session.Capacity;
      const isAlreadyBookedByMember = bookedSessionIds.includes(session._id.toString());

      return !isFull && !isAlreadyBookedByMember;
    });

    return res.status(200).json({
      message: "Available sessions fetched successfully",
      count: availableSessions.length,
      data: availableSessions,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "An error occurred while fetching available sessions",
      error: error.message,
    });
  }
};