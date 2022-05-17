import { Provide } from '@midwayjs/decorator';
import BaseService from './baseService';
import { transformTime } from '../utils/day';
import { Admin } from '../entity';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import * as md5 from 'md5';

export const transform = data =>
  data.map(({ id, number, photo, nickname, date }) => ({
    id,
    number: number ?? '暂未认证',
    photo,
    nickname,
    grade: number ? `${number.toString().slice(0, 4)}级` : '暂未认证',
    lastdate: date ? transformTime(date) : '无上次认证时间',
  }));

@Provide()
export default class UserService extends BaseService {
  salt: 'TUT';
  @InjectEntityModel(Admin)
  adminModel: Repository<Admin>;

  async adminLogin({
    student_ID,
    nickName,
    password,
  }: {
    student_ID: string;
    nickName: string;
    password: string;
  }) {
    try {
      const { user } = await this.adminModel.findOne({
        relations: ['user'],
        where: {
          password: md5(password + this.salt),
        },
      });
      const { number, nickname, photo, id } = user;
      if (student_ID === number && nickName === nickname) {
        return {
          avatar: photo,
          desc: '超级管理员',
          homePath: '/userCenter',
          password: password,
          realName: nickname,
          roles: [{ roleName: 'Super Admin', value: 'super' }],
          token: 'mockToken',
          userId: id,
          username: nickname,
          number,
        };
      }
    } catch (error) {
      console.log(
        '%c 🍖 error: ',
        'font-size:20px;background-color: #E41A6A;color:#fff;',
        error
      );
      return null;
    }
  }

  async getAllAdmin() {
    const adminList = await this.adminModel.find({
      relations: ['user'],
    });
    const res = adminList.map(({ user }) => user);
    return transform(res);
  }

  async createAdmin({ number, password }) {
    const newPassword = md5(password + this.salt);
    const user = await this.userModel.findOne({
      where: {
        number,
      },
    });
    const preAdmin = await this.adminModel.findOne({
      where: {
        password: newPassword,
      },
    });
    if (preAdmin !== null) {
      return '该管理员已经存在';
    }

    const admin = new Admin();
    admin.password = newPassword;
    admin.user = user;
    const res = await this.adminModel.save(admin);
    return res;
  }
}
