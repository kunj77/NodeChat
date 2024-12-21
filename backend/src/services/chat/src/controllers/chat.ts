import { Request, Response } from "express";
import Message, { IMessage } from "db/models/Message";

const getKey = (sender: string, receiver: string) => {
  const participants = [sender, receiver];
  participants.sort();
  return participants.join("_");
};

export const getMessages = async (req: Request, res: Response) => {
  const { sender, receiver } = req.query;
  if (!sender || !receiver) {
    res.status(400).json({ error: "Sender and receiver are required" });
  } else {
    const key = getKey(sender.toString(), receiver.toString());
    const messages = await Message.find({ key }) || [];
    
    res.json(messages);
  }
};

export const postMessage = async(req: Request, res: Response) => {
  const { message } = req.body;
  const messageDetails = JSON.parse(message);

    const { sender, receiver, message: messageText } = messageDetails;
  
    if (!sender || !receiver || !messageText) {
      res
        .status(400)
        .json({ message: "Sender, Receiver and message details are required" });
      return;
    }
  
    try {
      const key = getKey(sender.toString(), receiver.toString());
  
      const newMessage: IMessage = new Message({ key, sender, receiver, message: messageText, timestamp: new Date() });
      await newMessage.save();
  
      res.status(201).json({ message: "Message sent" });
      return;
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
      return;
    }
};
