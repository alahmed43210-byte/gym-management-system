import { Trainer } from "../models/Trainermodel.js";
import { Bookings } from "../models/Bookingsmodel.js";
import mongoose from "mongoose";
import  { Document, Schema } from "mongoose";


export interface ClassSessions extends Document{
Title:string;
Trainer:Trainer;
timeslot:(Date);
Capacity:number;
Bookingsreservations?:Bookings[];
}


const ClassSessionsSchema = new Schema<ClassSessions>(
{ Title :{

 type:String,
 trim:true,
 required:true,

  },

  Trainer:{

 type:Schema.Types.ObjectId,
 ref:'Trainer',
 required:true,

  },

timeslot: {
      type: Date,
      required: true,

  },
Capacity: {
      type: Number,
      required: true, 
      min: 1,

    },
Bookingsreservations: 
      {
        type: Schema.Types.ObjectId,
        ref: 'Booking',
      },

},
{
    timestamps: true,
}
);


const ClassSession = mongoose.model<ClassSessions>('ClassSession', ClassSessionsSchema);
export default ClassSession;
