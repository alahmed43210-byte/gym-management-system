import { IUser,UserRole } from "./Usersmodel.js";
import { IClassSessions } from "./Sessionsmodel.js";
import mongoose from "mongoose";
import  { Document, Schema } from "mongoose";

 export type ITrainer=IUser &{
role:UserRole.Trainer;
specialization:string;
experiencetime:(number);
presentedsessions?:IClassSessions;
}

const TrainerSchema = new Schema<ITrainer>(
{ role:{

 type:String,
 enum:[UserRole.Trainer],     
 required:true,
 default:UserRole.Trainer

  },

  specialization:{

 type:String,
 trim:true,
 lowercase:true,
 required:true,

  },

  experiencetime:{

 type:Number,
 required:true,
 min:0,

  },

  presentedsessions:{

type:Schema.Types.ObjectId,
ref:'ClassSession',
required:true,
  },
},
{
    timestamps: true,
}
);

const Trainer = mongoose.model<ITrainer>('Trainer', TrainerSchema);
export default Trainer;

export const sampletrainer:ITrainer[]=[
]