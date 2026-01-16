// src/chat/chat.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer()
  server: Server;

  // Join a room
  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: any, roomId: number) {
    client.join(roomId.toString());
    console.log(`Client ${client.id} joined room ${roomId}`);
  }
  
@SubscribeMessage('sendMessage')
async handleSendMessage(
  @MessageBody() data: { roomId: number; username: string; content: string },
) {
  console.log('Received sendMessage from frontend:', data);

  // Save message to DB
  const savedMessage = await this.chatService.createMessage(
    data.roomId,
    data.username,
    data.content,
  );

  // Emit the saved message directly, including username
  console.log('Emitting newMessage to clients:', savedMessage);
  this.server.to(data.roomId.toString()).emit('newMessage', savedMessage);

  return savedMessage;
}



}
