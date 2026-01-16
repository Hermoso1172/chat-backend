// chat-backend/src/rooms/rooms.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './room.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

 async findAll(username?: string) {
  if (!username) {
    return []; // Never return all rooms by default!
  }

  return this.roomRepository
    .createQueryBuilder('room')
    .where('FIND_IN_SET(:username, room.access)', { username })
    .getMany();
}


  // Create room (creator always has access)
  async create(name: string, creator: string) {
    const room = this.roomRepository.create({
      name,
      creator,
      access: [creator], // ✅ ARRAY
    });

    return this.roomRepository.save(room);
  }

  // Add user to room
  async addUserToRoom(roomId: number, username: string) {
    const room = await this.roomRepository.findOneBy({ id: roomId });
    if (!room) throw new Error('Room not found');

    if (!room.access.includes(username)) {
      room.access.push(username); // ✅ now valid
      await this.roomRepository.save(room);
    }

    return room;
  }
}
