import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Files,
  // Fields,
  Inject,
} from '@midwayjs/decorator';
import BaseController from './baseController';
import { OSSService } from '@midwayjs/oss';

interface ICreateData {
  text: string;
  position: string;
  type: number;
}

@Controller('/node/action')
export class HomeController extends BaseController {
  @Inject()
  ossService: OSSService;

  @Post('/getAll')
  async getAction(
    @Body('type') typeList: string[],
    @Body('number') number: number
  ) {
    let res = [];
    if (
      typeList !== undefined &&
      typeList.length !== 0 &&
      number !== undefined
    ) {
      res = await this.actionService.getActionByTarget(number, typeList);
    } else if (typeList !== undefined && typeList.length !== 0) {
      res = await this.actionService.getActionByType(typeList);
    } else if (number !== undefined) {
      res = await this.actionService.getActionByNumber(number);
    } else {
      res = await this.actionService.getAllAction();
    }

    return this.apiSuccess(res);
  }

  @Get('/zhiDing')
  async actionZhiDing(@Query('id') id: number) {
    const res = await this.actionService.actionZhiDing(id);
    return this.apiSuccess(res);
  }

  @Get('/Delete')
  async actionDelete(@Query('id') id: number) {
    const res = await this.actionService.actionDelete(id);
    return this.apiSuccess(res);
  }

  @Get('/detail')
  async actionDetail(@Query('id') id: number) {
    const res = await this.actionService.getActionDetailById(id);
    return this.apiSuccess(res);
  }

  // 新建动态
  @Post('/create')
  async actionCreate(
    @Body('nickName') nickName: string,
    @Body('urlList') urlList: string[],
    @Body('data') data: ICreateData
  ) {
    console.log(
      '%c 🍍 data: ',
      'font-size:20px;background-color: #93C0A4;color:#fff;',
      data
    );
    const [{ id }] = await this.userService.getUserByNickName(nickName);
    const res = await this.actionService.createAction(id, urlList, data);
    return this.apiSuccess(res);
  }

  @Post('/upload')
  async actionImgUpload(@Files() files) {
    const urlList = [];
    for (let count = 0; count < files.length; count++) {
      const { data, filename } = files[count];
      const { url } = await this.ossService.put(`/TUT/${filename}`, data);
      urlList.push(url);
    }
    return {
      urlList,
      message: 'uploadOK',
    };
  }
}
