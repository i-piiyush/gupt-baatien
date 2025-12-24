import mongoose from "mongoose";
import { Message, messageSchema } from "./message.model";

export interface User {
  username: string;
  password: string;
  verificationCode: string;
  verificationCodeExpiry: Date;
  email: string;
  isVerified: boolean;
  isAcceptingMessages: boolean;
  messages: Message[];
}

const userSchema = new mongoose.Schema<User>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "please use valid email address",
    ],
  },
  password: {
    type: String,
    required: true,
  },
  verificationCode: {
    type: String,
    required: true,
  },
  verificationCodeExpiry: {
    type: Date,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAcceptingMessages: {
    type: Boolean,
    default: true,
  },
  messages: [messageSchema],
});

export const userModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", userSchema);
