// 动态数据表
import { EntityModel } from '@midwayjs/orm';
import {
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { User } from './user';
import { BBS } from './BBS';

@EntityModel('comment')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @Column()
  commentator_id: number;

  @Column()
  comment_time: number;

  @Column()
  is_read: boolean;

  @Column()
  like_num: number;

  @ManyToOne(type => BBS)
  @JoinColumn({ name: 'action_id' })
  BBS: BBS;

  @OneToOne(() => User, { eager: true })
  @JoinColumn({ name: 'commentator_id' })
  commentator_user: User;
}
