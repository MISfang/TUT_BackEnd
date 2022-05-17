// 动态数据表
import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BBS } from './BBS';

@EntityModel('action_picture_merge')
export class BBSPicture {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  picture_url: string;

  @ManyToOne(type => BBS)
  @JoinColumn({ name: 'action_id' })
  BBS: BBS;
}
