import { Request,Response } from "express";
import { AuthRequest } from "../Middelware/Authentication.js";
import { UserRole } from "../models/Usersmodel.js";
import ClassSession from "../models/Sessionsmodel.js";
import Bookings from "../models/Bookingsmodel.js";
import { Bookingstatus } from "../models/Bookingsmodel.js";

/////bookAsession()=>patch

export const bookSession = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    if (user.role !== UserRole.Member) {
      return res.status(403).json({ message: "Only members can book sessions" });
    }

     const sessionId = req.params.SessionsID; 

    const session = await ClassSession.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

  
    if (session.timeslot <= new Date()) {
      return res.status(400).json({ message: "Cannot book a  finished session" });
    }

    const bookedCount = session.Bookingsreservations?.length || 0;
    if (bookedCount >= session.Capacity) {
      return res.status(400).json({ message:Bookingstatus.booked  });
    }

    
    const alreadyBooked = await Bookings.findOne({
      Member: user.userId,
      Session: sessionId,
    });
    if (alreadyBooked) {
      return res.status(400).json({ message: "You already booked this session" });
    }

    const newBooking = new Bookings({
      Member: user.userId,
      Session: sessionId,
    });

    await newBooking.save();

    return res.status(201).json({
      message: "Session booked successfully",
      data: newBooking,
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};



//   cancelbookedsession() 

export const cancelAbook = async (req: AuthRequest, res: Response) => {
  try {

    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const userId = user.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID is missing from request" });
    }

     const sessionId = req.params.SessionsID; 
      if(!sessionId){               return res.status(400).json({ message: "SessionID is required" });}

    if (user.role === UserRole.Member) {

       const bookings = await Bookings.findOne({
        Session: sessionId,
        Member: userId,
       });
        if(!bookings){
               return res.status(404).json({ message: "there are no bokings to be deleted" });
        }

        bookings.Status = Bookingstatus.cancelled;
        await bookings.save();

        await ClassSession.findByIdAndUpdate(sessionId, {
       $pull: { Bookingsreservations: bookings._id },
  });
       return res.status(200).json({
    message: "you deleted your reservation successfully",
  });
           
    }else{
           
          const session = await ClassSession.findOne({
        _id: sessionId,
        Trainer: userId,
        });
 

   if(!session){
        return res.status(404).json({ message: "there are no bokings to be deleted" });
   }

  const bookedCount = session.Bookingsreservations?.length || 0;
  if (bookedCount >= 1) {
    return res.status(400).json({
      message: "You cannot cancel the session because members have already booked it",
      bookedCount: bookedCount,
    });
  }

  await Bookings.updateMany(
    { Session: sessionId },
    { $set: { Status: Bookingstatus.cancelled } }
  );

  await ClassSession.findByIdAndUpdate(sessionId, {
    $set: { Bookingsreservations: [] },
  });
           return res.status(200).json({
    message: "you canceld your session successfully",
  });
    }
   
}
catch (error: any) {
    return res.status(500).json({
      message: "An error occurred while cancelling",
    });
  }
};
