import mongoose from "mongoose";
import  { Document, Schema } from "mongoose";
export enum UserRole{Member="member", Trainer="trainer"}




export interface User extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

const userSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },


    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
     
    },

    role: {
      type: String,
      enum:Object.values(UserRole),
      default: UserRole.Member,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<User>('User', userSchema);

export default User;