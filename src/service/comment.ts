import { Provide } from '@midwayjs/decorator';
import BaseService from './baseService';

@Provide()
export default class commentService extends BaseService {
  async deleteCommentById(id: number) {
    const One = await this.commentModel.findOne({
      where: {
        id,
      },
    });
    try {
      await this.commentModel.delete(One);
    } catch (error) {
      return error;
    }

    return 'OK';
  }
}
