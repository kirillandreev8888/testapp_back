import { Controller, Get } from '@nestjs/common';

@Controller('initial')
export class InitialController {
  @Get()
  getAll() {
    return JSON.stringify({
      msg: 'test msg',
    });
  }
}
