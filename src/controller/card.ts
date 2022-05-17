import { Controller, Post, Body, Get, Query } from '@midwayjs/decorator';
import BaseController from './baseController';

@Controller('/node/card')
export class HomeController extends BaseController {
  @Post('/getAll')
  async getCard(
    @Body('number') number: string,
    @Body('student_name') StuName: string,
    @Body('student_number') StuNum: string,
    @Body('isPickedText') isPicked: string[]
  ) {
    let isNumber = number !== undefined;
    let isStuName = StuName !== undefined;
    let isStuNum = StuNum !== undefined;
    let res = [];
    if (isNumber && isStuName && isStuNum) {
      res = await this.cardService.getCardByNumAndStuName(number, StuName);
    } else if (isNumber && isStuNum) {
      res = await this.cardService.getCardByStuNumAndNum(StuNum, number);
    } else if (isNumber && isStuName) {
      res = await this.cardService.getCardByNumAndStuName(number, StuName);
    } else if (isStuName && isStuNum) {
      res = await this.cardService.getCardByStuNumAndStuName(StuNum, StuName);
    } else if (isNumber) {
      res = await this.cardService.getCardByNum(number);
    } else if (isStuNum) {
      res = await this.cardService.getCardByStuNum(StuNum);
    } else if (isStuName) {
      res = await this.cardService.getCardByStuName(StuName);
    } else {
      res = await this.cardService.getAllCard();
    }
    if (isPicked && isPicked.length === 1) {
      let flag = !!+isPicked[0];
      res = res.filter(({ isPicked }) => isPicked === flag);
    }
    return this.apiSuccess(res);
  }

  @Get('/toggleIsPicked')
  async toggleIsPicked(@Query('id') id: number) {
    const res = await this.cardService.getCardById(id);
    if (res) {
      return this.apiSuccess(res);
    }
  }
}
