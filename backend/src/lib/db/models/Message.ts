import mongoose, { Document, Schema } from "mongoose";

export interface IMessage extends Document {
  key: string;
  sender: string;
  receiver: string;
  message: string;
  timestamp: Date;
}

const MessageSchema: Schema = new Schema({
  key: { type: String, required: true },
  sender: { type: String, required: true },
  receiver: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, required: true },
});

export default mongoose.model<IMessage>("Message", MessageSchema);
