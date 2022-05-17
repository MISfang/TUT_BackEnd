// 丢失卡数据表
import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user';

@EntityModel('card')
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  student_number: string;

  @Column()
  student_name: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column()
  describe: string;

  @Column()
  time: number;

  @Column()
  is_picked: boolean;

  @ManyToOne(type => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
