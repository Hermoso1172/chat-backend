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

  // Get rooms the user can access
  async findAll(username: string) {
    if (!username) return [];

    const allRooms = await this.roomRepository.find();

    const userRooms = allRooms.filter(room => {
      const accessArray = Array.isArray(room.access)
        ? room.access
        : (room.access as string).split(',');
      return accessArray.includes(username);
    });

    return userRooms;
  }

  // Create a room (creator always has access)
  async create(name: string, creator: string) {
    const room = this.roomRepository.create({
      name,
      creator,
      access: [creator],
    });

    return this.roomRepository.save(room);
  }

  // Add user to room access
  async addUserToRoom(roomId: number, username: string) {
    const room = await this.roomRepository.findOneBy({ id: roomId });
    if (!room) throw new Error('Room not found');

    const accessArray = Array.isArray(room.access)
      ? room.access
      : (room.access as string).split(',');

    if (!accessArray.includes(username)) {
      accessArray.push(username);
      room.access = accessArray;
      await this.roomRepository.save(room);
    }

    return room;
  }
}
