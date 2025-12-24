import mongoose, { Schema, model, models } from "mongoose";

export interface Message {
  content: string;
  createdAt: Date;
}

export const messageSchema = new Schema<Message>({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const messageModel =
  (models.Message as mongoose.Model <Message>)  || model<Message>("Message", messageSchema);
