import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Room } from '../rooms/room.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  content: string;

  @ManyToOne(() => Room, room => room.messages)
  room: Room;

  @CreateDateColumn()
  createdAt: Date;
}
