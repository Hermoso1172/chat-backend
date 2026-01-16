// chat-backend/src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatModule } from './chat/chat.module';
import { RoomsModule } from './rooms/rooms.module';
import { Message } from './chat/message.entity';
import { Room } from './rooms/room.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'chat_db',
      entities: [Message, Room],
      synchronize: true,
    }),
    ChatModule,
    RoomsModule, 
  ],
})
export class AppModule {}
