import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('messages')
export class MessagesController {
  constructor(private service: MessagesService) {}

  @ApiResponse({
    status: 200,
    description: 'Get messages for a specific room',
  })
  @Get(':roomId')
  getRoomMessages(@Param('roomId') roomId: string): CreateMessageDto[] {
    return this.service.findByRoom(roomId);
  }

  @ApiResponse({
    status: 201,
    description: 'Create a new message',
  })
  @Post()
  createMessage(@Body() body: CreateMessageDto): CreateMessageDto {
    return this.service.create(body);
  }
}
