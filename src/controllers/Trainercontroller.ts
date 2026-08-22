import { Request,Response } from "express";
import {UserRole } from "../models/Usersmodel.js";
import { AuthRequest } from "../Middelware/Authentication.js";
import ClassSession from "../models/Sessionsmodel.js"
import Bookings from "../models/Bookingsmodel.js";

// createsession()

export const createsession = async (req: AuthRequest, res: Response) => {
    try {

  const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    if (user.role !== UserRole.Trainer) {
     return res.status(403).json({ message: " YOU ARE UNAUTHORIZED TO MAKE A SESSION" });
    }  
const { Title, timeslot, Capacity } = req.body;
const newSession = new ClassSession({
      Title,
      timeslot: new Date(timeslot),
      Capacity,
      Trainer: user.userId,
      Bookingsreservations: [],
    });

    await newSession.save();

    return res.status(201).json({
      message: "A new session has been created successfully",
      data: newSession,
    })
  } catch (error) {
    res.status(500).json({ message: " erorr had occured" });
  }
}

//updatesessions() 

export const updatesessions = async (req: AuthRequest, res: Response) => {
try{
 const user = req.user;

    if (!user) {
      return  res.status(401).json({ message: "Unauthorized: User not found" });
    }

    const userId = user.userId;

    if (!userId) {
      return  res.status(400).json({ message: "User ID is missing from request" });
    }
    const sessionId = req.params.SessionsID;
if(!sessionId){
  return res.status(400).json({
      message:"no chosen sesssion"
  })
}
    if (user.role === UserRole.Trainer) {
      
     const trainerSession = await ClassSession.findOne({
      _id: sessionId,
      Trainer: user.userId,
    });
         if(!trainerSession){
      return res.status(400).json({
       message:" there is no Sessions were found to be updated"   
      });
    }
    const { title, timeslot, capacity, Bookingsreservations } = req.body;
   if (title) trainerSession.Title = title;
   if (timeslot) trainerSession.timeslot = timeslot;
   if (capacity) trainerSession.Capacity = capacity;
   if (Bookingsreservations) trainerSession.Bookingsreservations = Bookingsreservations;

  await trainerSession.save();

  return res.status(200).json({
    message: "Session updated successfully",
    data: trainerSession,
  });
     
  }else{

   return res.status(403).json({
     message:"access denied"
    })
  }
}catch(erorr:any){
  return res.status(500).json({ message: erorr.message });
};

}


//deletsession()  


export const cdeletsesssion= async (req: AuthRequest, res: Response) => {
try{

    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const userId = user.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID is missing from request" });
    }

      if (user.role === UserRole.Trainer) {
      
     const sessionId = req.params.SessionsID; 
      if(!sessionId){     return res.status(400).json({ message: "SessionID is required" });}


          const session = await ClassSession.findOne({
        _id: sessionId,
        Trainer: userId,
        });
 
       if(!session){
        return res.status(404).json({ message: "you cant delet a session that u dont have access to" });
   }
   
      

    await Bookings.deleteMany({ Session: sessionId });
    await ClassSession.findByIdAndDelete(sessionId);

     return res.status(200).json({
    message:"you deleted your session successfully and uncondithionly"
});
      }


}catch(erorr:any){
  return res.status(500).json({
      message: "An error occurred while deleting",
    });
}

}


// view bookings()

export const viewbookings = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const userId = user.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID is missing from request" });
    }

    if (user.role !== UserRole.Trainer) {
      return res.status(403).json({ message: "Only trainers can view their bookings" });
    }

  
    const trainerSessions = await ClassSession.find({ Trainer: userId });

    if (!trainerSessions || trainerSessions.length === 0) {
      return res.status(404).json({ message: "You have no sessions yet" });
    }

    const sessionIds = trainerSessions.map((session) => session._id);

   
    const bookings = await Bookings.find({ Session: { $in: sessionIds } })
      .populate("Member", "name email") 
      .populate("Session", "Title timeslot"); 

    return res.status(200).json({
      message: "Bookings fetched successfully",
      data: bookings,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while fetching bookings",
    });
  }
};