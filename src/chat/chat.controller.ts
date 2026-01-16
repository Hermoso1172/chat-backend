import { Controller, Get, Param } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  // GET /rooms
  @Get('rooms')
  getRooms() {
    return this.chatService.getRooms();
  }

  // GET /messages/:roomId
  @Get('messages/:roomId')
  getMessages(@Param('roomId') roomId: string) {
    return this.chatService.getMessages(+roomId); 
  }
}
