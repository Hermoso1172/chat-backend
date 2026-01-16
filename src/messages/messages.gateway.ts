import { Socket } from 'socket.io';
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';

@WebSocketGateway({ cors: true })
export class MessagesGateway {
  @WebSocketServer()
  server: Server;

  constructor(private messagesService: MessagesService) {}

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, roomId: string) {
    client.join(roomId);
  }

  @SubscribeMessage('sendMessage')
  handleMessage(client: Socket, @MessageBody() message: CreateMessageDto) {
    // Save message in memory / DB
    const savedMessage = this.messagesService.create(message);

    // Broadcast to everyone EXCEPT the sender
    client.broadcast.to(message.roomId).emit('newMessage', savedMessage);

    // Return saved message to the sender so they can display it
    return savedMessage;
  }
}
