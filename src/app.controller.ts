import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class AppController {
  @Get('/')
  app() {
    return 'Hello kkwon blog api';
  }
}
