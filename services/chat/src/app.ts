import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import setChatRoutes from './routes';
import cors from 'cors';
import connectDB from '../../db';

const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

setChatRoutes(app);

const PORT = process.env.PORT || 5002;
connectDB().then(() => {
  const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket: Socket) => {
  console.log('a user connected');

  socket.on('message', (message: string) => {
    console.log('message received:', message);
    // Broadcast the message to all connected clients
    io.emit('message', message);
  });

  socket.on('disconnect', (reason: string) => {
    console.log('user disconnected:', reason);
  });
});

  server.listen(PORT, () => {
    console.log(`Chat service is running on port ${PORT}`);
  });
});