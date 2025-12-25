import mongoose from "mongoose";
import { Message, messageSchema } from "./message.model";

export interface User {
  username: string;
  password: string;

  email: string;

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

  isAcceptingMessages: {
    type: Boolean,
    default: true,
  },
  messages: [messageSchema],
});

export const userModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", userSchema);
