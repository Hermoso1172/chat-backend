// src/chat/chat.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { Room } from '../rooms/room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

 async createMessage(roomId: number, username: string, content: string) {
  const room = await this.roomRepository.findOne({ where: { id: roomId } });
  if (!room) throw new Error('Room not found');

  const message = this.messageRepository.create({
    room,
    username,
    content
  });

  const savedMessage = await this.messageRepository.save(message);

  // Return **all the fields frontend needs**
  return {
    id: savedMessage.id,
    roomId: room.id,
    username: savedMessage.username,
    content: savedMessage.content,  
    createdAt: savedMessage.createdAt
  };
}




  async getMessages(roomId: number) {
    return this.messageRepository.find({
      where: { room: { id: roomId } },
      order: { id: 'ASC' },
    });
  }

  // ✅ Add this method
  async getRooms() {
    return this.roomRepository.find(); // returns all rooms
  }
}
