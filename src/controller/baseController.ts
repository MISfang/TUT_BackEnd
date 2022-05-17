import { Inject, App } from '@midwayjs/decorator';
import { Context } from 'egg';
import {
  userService,
  actionService,
  cardService,
  commentService,
  adminService,
} from '../service';
import { IMidwayApplication } from '@midwayjs/core';

export default class baseController {
  @Inject()
  ctx: Context;

  @App()
  app: IMidwayApplication;

  @Inject()
  userService: userService;

  @Inject()
  actionService: actionService;

  @Inject()
  cardService: cardService;

  @Inject()
  commentService: commentService;

  @Inject()
  adminService: adminService;

  apiSuccess(data: any, message: string = 'OK', code: number = 200) {
    return {
      data,
      message,
      code,
    };
  }

  apiError(data: any, message: string = 'ERROR', code: number = 400) {
    return {
      data,
      message,
      code,
    };
  }
}
