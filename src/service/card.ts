import { Provide } from '@midwayjs/decorator';
import BaseService from './baseService';
import { Like } from 'typeorm';
import { transformTime } from '../utils/day';

export const transFormList = data =>
  data.map(
    ({
      id,
      describe,
      address,
      student_number,
      student_name,
      phone,
      time,
      is_picked,
      user,
    }) => ({
      number: user?.number ?? '20195505',
      actionId: id,
      phone,
      describe,
      address,
      student_number,
      student_name,
      isPicked: is_picked,
      isPickedText: is_picked ? '已获取' : '未获取',
      time: transformTime(time),
    })
  );

@Provide()
export default class cardService extends BaseService {
  async getAllCard() {
    const list = await this.cardModel.find({ relations: ['user'] });
    return transFormList(list);
  }

  async getCardByStuNum(StuNum: string) {
    const list = await this.cardModel.find({
      relations: ['user'],
      where: {
        student_number: Like(`%${StuNum}%`),
      },
    });

    return transFormList(list);
  }

  async getCardByNum(number: string) {
    const list = await this.cardModel.find({
      relations: ['user'],
      where: {
        user: { number: Like(`%${number}%`) },
      },
    });
    return transFormList(list);
  }

  async getCardByStuName(StuName: string) {
    const list = await this.cardModel.find({
      relations: ['user'],
      where: {
        student_name: Like(`%${StuName}%`),
      },
    });
    return transFormList(list);
  }

  async getCardByStuNumAndNum(StuNum: string, number: string) {
    const list = await this.cardModel.find({
      relations: ['user'],
      where: {
        student_number: Like(`%${StuNum}%`),
        user: { number: Like(`%${number}%`) },
      },
    });
    return transFormList(list);
  }

  async getCardByStuNumAndStuName(StuNum: string, StuName: string) {
    const list = await this.cardModel.find({
      relations: ['user'],
      where: {
        student_number: Like(`%${StuNum}%`),
        student_name: Like(`%${StuName}%`),
      },
    });
    return transFormList(list);
  }

  async getCardByNumAndStuName(number: string, StuName: string) {
    const list = await this.cardModel.find({
      relations: ['user'],
      where: {
        user: { number: Like(`%${number}%`) },
        student_name: Like(`%${StuName}%`),
      },
    });
    return transFormList(list);
  }

  async getCardById(id: number) {
    const item = await this.cardModel.findOne({
      relations: ['user'],
      where: {
        id,
      },
    });
    item.is_picked = !item.is_picked;
    await this.cardModel.save(item);
    return 'OK';
  }
}
