import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';

// 使用到的数据库实例
import { User, BBS, Card, Comment, Admin } from '../entity';

@Provide()
export default class BaseService {
  @InjectEntityModel(User)
  userModel: Repository<User>;

  @InjectEntityModel(BBS)
  actionModel: Repository<BBS>;

  @InjectEntityModel(Card)
  cardModel: Repository<Card>;

  @InjectEntityModel(Comment)
  commentModel: Repository<Comment>;

  @InjectEntityModel(Admin)
  adminModel: Repository<Admin>;
}
