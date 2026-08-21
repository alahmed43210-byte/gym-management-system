import { ClassSessions } from "./Sessionsmodel.js";
import { Member } from "./Membermodel.js";
import mongoose from "mongoose";
import  { Document, Schema } from "mongoose";

export enum Bookingstatus{booked="booked",cancelled="cancelled",notbooked="notbooked"}

export interface Bookings extends Document{  
Session: ClassSessions;
Member:Member;
Status:Bookingstatus; 
}


const BookingsSchema: Schema<Bookings> = new Schema(
  {
    Session: {
      type: Schema.Types.ObjectId,
      ref: 'ClassSession',
      required: true, 
    },
    Member: {
      type: Schema.Types.ObjectId,
      ref: 'Member',
      required: true,
    },
    Status: {
      type: String,
      enum: Object.values(Bookingstatus),
      default: Bookingstatus.notbooked,
      required: true, 
    },
  },
  {
    timestamps: true, 
  }
);


const Bookings = mongoose.model<Bookings>('Bookings', BookingsSchema);
export default Bookings;