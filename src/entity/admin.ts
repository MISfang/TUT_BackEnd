// 动态数据表
import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';
import { User } from './user';

@EntityModel('admin')
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  password: string;

  @OneToOne(type => User)
  @JoinColumn({ name: 'user_Id' })
  user: User;
}
