import { Provide } from '@midwayjs/decorator';
import BaseService from './baseService';
import { Like } from 'typeorm';

@Provide()
export default class UserService extends BaseService {
  async getAllUser() {
    return await this.userModel.find({});
  }
  async getUserByNumber(number: number) {
    return await this.userModel.find({
      where: {
        number: Like(`%${number}%`),
      },
    });
  }
  async getUserByNickName(nickname: string) {
    return await this.userModel.find({
      where: {
        nickname: Like(`%${nickname}%`),
      },
    });
  }

  async getUserByNickName2(nickname: string) {
    return await this.userModel.find({
      where: {
        nickname,
      },
    });
  }

  async getUserByTarget(number: number, nickname: string) {
    return await this.userModel.find({
      where: {
        number: Like(`%${number}%`),
        nickname: Like(`%${nickname}%`),
      },
    });
  }
}
