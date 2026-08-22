import { ITrainer } from "./Trainersmodel.js";
import { IBookings } from "./Bookingsmodel.js";
import mongoose from "mongoose";
import  { Document, Schema } from "mongoose";


export interface IClassSessions extends Document{
Title:string;
Trainer:ITrainer;
timeslot:(Date);
Capacity:number;
Bookingsreservations?:IBookings[];
}


const ClassSessionsSchema = new Schema<IClassSessions>(
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


const ClassSession = mongoose.model<IClassSessions>('ClassSession', ClassSessionsSchema);
export default ClassSession;


export const sampleSessions:IClassSessions[]=[  
]


