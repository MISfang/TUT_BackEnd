import { Controller, Get, Query } from '@midwayjs/decorator';
import BaseController from './baseController';

@Controller('/node/comment')
export class HomeController extends BaseController {
  @Get('/delete')
  async deleteComment(@Query('id') id: number) {
    const res = await this.commentService.deleteCommentById(id);
    return this.apiSuccess(res);
  }
}
