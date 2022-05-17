import { MidwayConfig, MidwayAppInfo } from '@midwayjs/core';
import { join } from 'path';

export default (appInfo: MidwayAppInfo) => {
  return {
    // use for cookie sign key, should change to your own and keep security
    keys: appInfo.name + '_1650251753092_5917',
    egg: {
      port: 7001,
    },
    orm: {
      /**
       * 单数据库实例
       */
      type: 'mysql',
      host: '47.94.151.148',
      port: 3333,
      username: 'root',
      password: '123456',
      database: 'tianlitong',
      synchronize: false, // 如果第一次使用，不存在表，有同步的需求可以写 true
      logging: false,
    },

    upload: {
      // mode: UploadMode, 默认为file，即上传到服务器临时目录，可以配置为 stream
      mode: 'file',
      // fileSize: string, 最大上传文件大小，默认为 10mb
      fileSize: '10mb',
      // whitelist: string[]，文件扩展名白名单
      // whitelist: uploadWhiteList.filter(ext => ext !== '.pdf'),
      // tmpdir: string，上传的文件临时存储路径
      tmpdir: join('./TUT_node'),
      // cleanTimeout: number，上传的文件在临时目录中多久之后自动删除，默认为 5 分钟
      cleanTimeout: 5 * 60 * 1000,
    },
    oss: {
      // normal oss bucket
      client: {
        accessKeyId: 'LTAI5tJgPeYFLBzUdXcQ9zYy',
        accessKeySecret: 'rUYXxIuKIhBMumaofNXuWmJisl3HyT',
        bucket: 'tut-fang',
        endpoint: 'oss-cn-beijing.aliyuncs.com',
        timeout: '60s',
      },
    },

    cors: {
      credentials: false,
      // allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEADERS'],
      // origin:'http://47.94.128.16',
    },
  } as MidwayConfig;
};
