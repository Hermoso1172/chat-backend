import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private service: MessagesService) {}

  @Get(':roomId')
  getRoomMessages(@Param('roomId') roomId: string): CreateMessageDto[] {
    return this.service.findByRoom(roomId);
  }

  @Post()
  createMessage(@Body() body: CreateMessageDto): CreateMessageDto {
    return this.service.create(body);
  }
}
