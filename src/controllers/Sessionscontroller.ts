import { Request,Response } from "express";
import User, { UserRole } from "../models/Usersmodel.js";
import ClassSession, { sampleSessions } from "../models/Sessionsmodel.js";
import Bookings from "../models/Bookingsmodel.js";
import { AuthRequest } from "../Middelware/Authentication.js";



export const getsession = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    
    const userId = user.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID is missing from request" });
    }

    
    if (user.role === UserRole.Trainer) {
      const trainerSessions = await ClassSession.findOne({ Trainer:user.userId });

      return res.status(200).json({
        message: "We found your presented sessions",
        data: trainerSessions
      });
    }

    
    if (user.role === UserRole.Member) {
      const memberBookings = await Bookings.find({ Member: userId })
        .populate("Session");

      return res.status(200).json({
        message: "We found your bookings",
        data: memberBookings
      });
    }

    return res.status(400).json({ message: "Invalid user role" });

  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};


export const checkcapacity= async (req: Request, res: Response) => {
  try {
    const sessionId =Number(req.params.SessionsID);

    const session = await ClassSession.findById(sessionId);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    const bookedCount = session.Bookingsreservations?.length || 0;

    if (bookedCount >= session.Capacity) {
      return res.status(200).json({
        message: "Session is full",
        isFull: true,
      });
    }

    return res.status(200).json({
      message: "Session has available spots",
      isFull: false,
      availableSpots: session.Capacity - bookedCount,
    });

  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};


export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const sessionsStats = sampleSessions.map((session) => {
      const bookedCount = session.Bookingsreservations?.length || 0; 
      const occupancyRate = (bookedCount / session.Capacity) * 100;  

      return {
        sessionId: session._id,
        title: session.Title,
        capacity: session.Capacity,
        bookedCount,
        occupancyRate: Math.round(occupancyRate),
      };
    });

    const busiestClasses = [...sessionsStats]
      .sort((a, b) => b.bookedCount - a.bookedCount)
      .slice(0, 5); 

   
    const totalCapacity = sampleSessions.reduce((sum, s) => sum + s.Capacity, 0);
    const totalBooked = sampleSessions.reduce(
      (sum, s) => sum + (s.Bookingsreservations?.length || 0),
      0
    );
    const overallAttendanceRate =
      totalCapacity > 0 ? Math.round((totalBooked / totalCapacity) * 100) : 0;

    return res.status(200).json({
      message: "Dashboard stats retrieved successfully",
      data: {
        totalSessions: sampleSessions.length,
        overallAttendanceRate,
        busiestClasses,
      },
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
