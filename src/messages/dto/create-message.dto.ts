import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty({
    example: '1',
    description: 'The ID of the chat room',
  })
  roomId: string;

  @ApiProperty({
    example: 'john_doe',
    description: 'The sender of the message',
  })
  sender: string;

  @ApiProperty({
    example: 'Hello, world!',
    description: 'The content of the message',
  })
  content: string;
}
