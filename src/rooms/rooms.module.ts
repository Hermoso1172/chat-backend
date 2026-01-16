// src/rooms/rooms.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { Room } from './room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Room])], // <- MUST be here
  providers: [RoomsService],
  controllers: [RoomsController],
})
export class RoomsModule {}
