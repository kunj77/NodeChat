import { io, Socket } from 'socket.io-client';
import eventEmitter from './eventEmitter';

class WebSocketService {
  private socket: Socket | null = null;
  private static instance: WebSocketService;

  static getInstance() {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  connect(url: string) {
    if (this.socket) {
      console.log('FE WebSocket already connected');
      return;
    }

    this.socket = io(url);

    this.socket.on('connect', () => {
      console.log('WebSocket connection opened');
    });

    this.socket.on('message', (message: string) => {
      console.log('WebSocket message received FE:', message);
      eventEmitter.emit('newMessage', message);
    });

    this.socket.on('disconnect', (reason: string) => {
      console.log('WebSocket connection closed:', reason);
      // Attempt to reconnect after 3 seconds
      setTimeout(() => this.connect(url), 3000);
    });

    this.socket.on('connect_error', (error: Error) => {
      console.error('WebSocket connection error:', error);
    });
  }

  sendMessage(message: string) {
    console.log('Sending message:', message);
    if (this.socket) {
      this.socket.emit('message', message);
    } else {
      console.error('WebSocket is not connected');
    }
  }

  close() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

export default WebSocketService.getInstance();