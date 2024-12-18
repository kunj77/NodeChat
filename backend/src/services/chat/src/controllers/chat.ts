import { Request, Response } from 'express';

type Message = {
    id: string;
    sender: string;
    receiver: string;
    message: string;
}
let messages: Message[] = [];

const getKey = (sender: string, receiver: string) => {
    const participants = [sender, receiver];
    participants.sort();
    return participants.join('_');
}

export const getMessages = (req: Request, res: Response) => {
    const { sender, receiver } = req.query;
    if (!sender || !receiver) {
        res.status(400).json({ error: 'Sender and receiver are required' });
    } else {
        const key = getKey(sender.toString(), receiver.toString());
        const filteredMessages = messages.filter(message => message.id === key);
        res.json(filteredMessages);
    }
};

export const postMessage = (req: Request, res: Response) => {
    const { message } = req.body;
    const messageDetails = JSON.parse(message);
    messages.push({ ...messageDetails, id: getKey(messageDetails.sender, messageDetails.receiver)});
    res.status(201).json({ message: 'Message sent' });
};