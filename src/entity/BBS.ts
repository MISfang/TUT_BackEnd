// 动态数据表
import { EntityModel } from '@midwayjs/orm';
import {
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user';
import { BBSPicture } from './BBSPicture';
import { Comment } from './comment';

@EntityModel('action')
export class BBS {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  position: string;

  @Column()
  type: string;

  @Column()
  release_time: number;

  @Column()
  comment_num: number;

  @Column()
  like_num: number;

  @Column()
  is_top: boolean;

  @ManyToOne(type => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(type => BBSPicture, BBSPicture => BBSPicture.BBS, {
    cascade: true,
  })
  BBSPictureList: BBSPicture[];

  @OneToMany(type => Comment, Comment => Comment.BBS)
  Comment: Comment[];
}
