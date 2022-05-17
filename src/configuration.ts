import * as crossDomain from '@midwayjs/cross-domain';
import * as egg from '@midwayjs/web';
import * as orm from '@midwayjs/orm';
import * as upload from '@midwayjs/upload';
// import * as cache from '@midwayjs/cache';
import * as oss from '@midwayjs/oss';
import { App, Configuration } from '@midwayjs/decorator';
import { Application } from 'egg';
import { ILifeCycle } from '@midwayjs/core';
import { join } from 'path';

@Configuration({
  imports: [egg, orm, crossDomain, upload, oss],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: Application;

  async onReady() {}
}
