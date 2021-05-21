import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class AppController {
  @Get('/')
  app() {
    return {
      message: 'hello world',
      status: 200,
    };
  }
}
