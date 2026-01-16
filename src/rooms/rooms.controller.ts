// src/rooms/rooms.controller.ts
import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  // Get rooms accessible to the current user
  @Get()
  async getRooms(@Query('username') username: string) {
    if (!username) return []; // safety check
    return this.roomsService.findAll(username);
  }

  // Create a new room
  @Post('create')
  async createRoom(@Body() body: { name: string; creator: string }) {
    const { name, creator } = body;
    return this.roomsService.create(name, creator);
  }

  // Add user to room access
  @Post('addUser')
  async addUser(@Body() body: { roomId: number; username: string }) {
    const { roomId, username } = body;
    return this.roomsService.addUserToRoom(roomId, username);
  }
}
