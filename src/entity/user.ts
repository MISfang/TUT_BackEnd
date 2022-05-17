// 用户数据表
import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BBS } from './BBS';
@EntityModel('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  openid: string;

  @Column({
    length: 8,
  })
  number: string;

  @Column({
    length: 216,
  })
  photo: string;

  @Column({
    length: 50,
  })
  nickname: string;

  @Column()
  date: number;

  @OneToMany(type => BBS, BBS => BBS.user) // note: we will create author property in the Photo class below
  actionLists: BBS[];
}
