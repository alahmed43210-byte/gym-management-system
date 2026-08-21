import { User,UserRole } from "../models/Usersmodel.js";
import { ClassSessions } from "../models/Sessionsmodel.js";
import mongoose from "mongoose";
import  { Document, Schema } from "mongoose";

 export type Trainer=User &{
Role:UserRole.Trainer;
specialization:string;
experiencetime:(number);
presentedsessions?:ClassSessions;
}

const TrainerSchema = new Schema<Trainer>(
{ Role:{

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

const Trainer = mongoose.model<Trainer>('Trainer', TrainerSchema);
export default Trainer;

export const sampletrainer:Trainer[]=[
]