import { UserRole, User } from "./Usersmodel.js";
import { Bookings } from "../models/Bookingsmodel.js";
import mongoose from "mongoose";
import  { Document, Schema } from "mongoose";


export type Member=User &{
Role:UserRole.Member;
membershiptype:string;
Bookedsession?:Bookings;
}


const MemberSchema = new Schema<Member>(
{ Role :{

 type:String,
 enum:[UserRole.Member],     
 required:true,
 default:UserRole.Member,

  },

  membershiptype:{

 type:String,
 trim:true,
 lowercase:true,
 required:true,

  },

  Bookedsession:{

 type:Schema.Types.ObjectId,
 ref:'Bookings',
required:true,

  },

},
{
    timestamps: true,
}
);

const Member = mongoose.model<Member>('Member', MemberSchema);
export default Member;
