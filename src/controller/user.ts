import { Body, Controller, Get, Post } from '@midwayjs/decorator';
import BaseController from './baseController';
import { transformTime } from '../utils/day';
const transform = data =>
  data.map(({ id, number, photo, nickname, date }) => ({
    id,
    number: number ?? '暂未认证',
    photo,
    nickname,
    grade: number ? `${number.toString().slice(0, 4)}级` : '暂未认证',
    lastdate: date ? transformTime(date) : '无上次认证时间',
  }));

@Controller('/node/user')
export class HomeController extends BaseController {
  @Post('/getAll')
  async getAllUser(
    @Body('grade') targetGrade: string[],
    @Body('number') number: number,
    @Body('nickname') nickname: string
  ) {
    let res = [];

    if (number !== undefined && nickname !== undefined) {
      res = await this.userService.getUserByTarget(number, nickname);
    } else if (number !== undefined) {
      res = await this.userService.getUserByNumber(number);
    } else if (nickname !== undefined) {
      res = await this.userService.getUserByNickName(nickname);
    } else {
      res = await this.userService.getAllUser();
    }

    let data = transform(res);

    if (targetGrade && targetGrade.length !== 0) {
      data = data.filter(({ grade }) =>
        targetGrade.some(item => item === grade)
      );
    }
    return this.apiSuccess(data);
  }

  @Get('/grade')
  async getUserGrade() {
    const all = await this.userService.getAllUser()
    const A = await this.userService.getUserByNumber(2018);
    const B = await this.userService.getUserByNumber(2019);
    const C = await this.userService.getUserByNumber(2020);
    const D = await this.userService.getUserByNumber(2021);

    const res = [
      { value: A.length, name: "2018级" },
      { value: B.length, name: "2019级" },
      { value: C.length, name: "2020级" },
      { value: D.length, name: "2021级" },
      { value: all.length - A.length - B.length - C.length - D.length, name: "未认证" },
    ];

    return this.apiSuccess(res)
  }
}
