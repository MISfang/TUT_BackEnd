import { Body, Controller, Get, Post } from '@midwayjs/decorator';
import BaseController from './baseController';

interface loginData {
  student_ID: string;
  nickName: string;
  password: string;
}
@Controller('/node/admin')
export class HomeController extends BaseController {
  @Post('/login')
  async adminLogin(@Body() data: loginData) {
    const res = await this.adminService.adminLogin(data);
    if (res) {
      return {
        code: 0,
        message: 'ok',
        result: res,
        type: 'success',
      };
    } else {
      return this.apiError({}, '管理员不存在', 404);
    }
  }

  @Get('/getAll')
  async getAll() {
    const res = await this.adminService.getAllAdmin();
    return this.apiSuccess(res);
  }

  @Post('/create')
  async create(
    @Body('number') number: number,
    @Body('password') password: string
  ) {
    const res = await this.adminService.createAdmin({
      number,
      password,
    });
    if (typeof res === 'string') {
      return this.apiError({}, res, 400);
    } else {
      return this.apiSuccess(res);
    }
  }
  @Post('/getUserInfo')
  async getUserInfo(@Body() data: loginData) {
    return await this.adminLogin(data);
  }
}
