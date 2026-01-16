import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesService {
  private messages: CreateMessageDto[] = [];

  // Get all messages for a specific room
  findByRoom(roomId: string): CreateMessageDto[] {
    return this.messages.filter((m) => m.roomId === roomId);
  }

  // Create a new message (stored in memory)
  create(message: CreateMessageDto): CreateMessageDto {
    this.messages.push(message);
    return message;
  }
}
