import { Controller, Get, Param } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ApiResponse } from '@nestjs/swagger';

@Controller()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @ApiResponse({
    status: 200,
    description: 'List of chat rooms',
  })
  // GET /rooms
  @Get('rooms')
  getRooms() {
    return this.chatService.getRooms();
  }

  @ApiResponse({
    status: 200,
    description: 'Messages for a specific chat room',
  })
  // GET /messages/:roomId
  @Get('messages/:roomId')
  getMessages(@Param('roomId') roomId: string) {
    return this.chatService.getMessages(+roomId);
  }
}
