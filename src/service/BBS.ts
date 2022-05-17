import { Provide } from '@midwayjs/decorator';
import BaseService from './baseService';
import { Like, In } from 'typeorm';
import { transformTime } from '../utils/day';
import { transFormType } from '../utils/tansform';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';

// 使用到的数据库实例
import { BBS, BBSPicture } from '../entity';

export const transFormList = data =>
  data.map(
    ({
      id,
      text,
      position,
      type,
      release_time,
      comment_num,
      like_num,
      is_top,
      user: { number },
    }) => ({
      number: number ?? '20195505',
      position,
      text,
      actionId: id,
      type: transFormType(type),
      commentNum: comment_num,
      likeNum: like_num,
      releaseTime: transformTime(release_time),
      isTop: is_top,
    })
  );

export const transFormDetailData = ({
  id,
  text,
  position,
  type,
  release_time,
  comment_num,
  like_num,
  is_top,
  BBSPictureList,
  user: { number, photo, nickname },
  Comment,
}) => ({
  position,
  text,
  actionId: id,
  type: transFormType(type),
  commentNum: comment_num,
  likeNum: like_num,
  releaseTime: transformTime(release_time),
  isTop: is_top,
  picList: BBSPictureList.map(({ picture_url }) => picture_url),
  releaseUser: {
    releaseUserNumber: number,
    releaseUserNickName: nickname,
    releaseUserAvatar: photo,
  },
  commentList: Comment.map(
    ({
      id,
      comment,
      comment_time,
      is_read,
      like_num,
      commentator_user: { number, photo, nickname },
    }) => ({
      commentId: id,
      commentText: comment,
      commentTime: transformTime(comment_time),
      isRead: is_read,
      likeNum: like_num,
      commentatorUserNumber: number,
      commentatorUserAvator: photo,
      commentatorUserNickName: nickname,
    })
  ),
});

@Provide()
export default class UserService extends BaseService {
  @InjectEntityModel(BBS)
  actionModel: Repository<BBS>;
  @InjectEntityModel(BBSPicture)
  BBSPictureModel: Repository<BBSPicture>;

  async getAllAction() {
    const list = await this.actionModel.find({ relations: ['user'] });
    return transFormList(list);
  }

  async getActionByNumber(number: number) {
    const list = await this.actionModel.find({
      relations: ['user'],
      where: {
        user: { number: Like(`%${number}%`) },
      },
    });
    return transFormList(list);
  }

  async getActionByType(typeList: string[]) {
    const list = await this.actionModel.find({
      relations: ['user'],
      where: {
        type: In(typeList),
      },
    });
    return transFormList(list);
  }

  async getActionByTarget(number: number, typeList: string[]) {
    const list = await this.actionModel.find({
      relations: ['user'],
      where: {
        user: { number: Like(`%${number}%`) },
        type: In(typeList),
      },
    });
    return transFormList(list);
  }

  async actionZhiDing(id: number) {
    const action = await this.actionModel.findOne({
      where: {
        id,
      },
    });
    action.is_top = !action.is_top;
    await this.actionModel.save(action);
    return '修改置顶状态成功';
  }

  async actionDelete(id: number) {
    const action = await this.actionModel.findOne({
      where: {
        id,
      },
    });
    await this.actionModel.remove(action);
    return '删除成功';
  }

  async getActionDetailById(id: number) {
    const data = await this.actionModel.findOne({
      relations: ['BBSPictureList', 'user', 'Comment'],
      where: {
        id,
      },
    });
    const { release_time } = data;
    console.log('%c 🍩 release_time: ', 'font-size:20px;background-color: #F5CE50;color:#fff;', release_time);
    console.log('%c 🍺 release_time: ', 'font-size:20px;background-color: #42b983;color:#fff;', transformTime(release_time));
    return transFormDetailData(data);
  }

  // 新建动态
  async createAction(id, urlList = [], { text, position, type }) {
    const user = await this.userModel.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      return '出错啦,请稍后再试';
    }
    // action本体信息
    const action = new BBS();
    action.user = user;
    action.text = text;
    action.position = position;
    action.type = type;
    action.comment_num = 0;
    action.like_num = 0;
    action.is_top = false;
    const time = Date.now();
    action.release_time = time;

    const imgList = [];
    if (urlList.length > 0) {
      for (let i = 0; i < urlList.length; i++) {
        const photo = new BBSPicture();
        photo.picture_url = urlList[i];
        imgList.push(photo);
      }
    }
    action.BBSPictureList = imgList;
    return await this.actionModel.save(action);
  }
}
