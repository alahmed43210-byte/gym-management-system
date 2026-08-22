import { UserRole, IUser } from "./Usersmodel.js";
import { IBookings } from "./Bookingsmodel.js";
import mongoose from "mongoose";
import  { Document, Schema } from "mongoose";


export type IMember=IUser &{
role:UserRole.Member;
membershiptype:string;
Bookedsession?:IBookings;
}


const MemberSchema = new Schema<IMember>(
{ role :{

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

const Member = mongoose.model<IMember>('Member', MemberSchema);
export default Member;

export const samplemembers:IMember[]=[
]