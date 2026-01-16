// src/rooms/room.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Message } from '../chat/message.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  creator: string;

  // Array column storing usernames who have access
  @Column('simple-array')
  access: string[];

  @OneToMany(() => Message, message => message.room)
  messages: Message[];
}
