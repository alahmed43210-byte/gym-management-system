import { IClassSessions } from "./Sessionsmodel.js";
import { IMember } from "./Membermodel.js";
import mongoose from "mongoose";
import  { Document, Schema } from "mongoose";

export enum Bookingstatus{booked="booked",cancelled="cancelled",notbooked="notbooked"}

export interface IBookings extends Document{  
Session: IClassSessions;
Member:IMember;
Status:Bookingstatus; 
}


const BookingsSchema: Schema<IBookings> = new Schema(
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


const Bookings = mongoose.model<IBookings>('Bookings', BookingsSchema);
export default Bookings;

export const sampleBookings:IBookings[]=[
]