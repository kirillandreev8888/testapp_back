import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InitialController } from './initial/initial.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupModule } from './group/group.module';
import config from 'ormconfig';
import { AppGateway } from './app.gateway';
import { TutorModule } from './tutor/tutor.module';
import { LessonModule } from './lesson/lesson.module';
@Module({
  imports: [TypeOrmModule.forRoot(config), GroupModule, TutorModule, LessonModule],
  controllers: [AppController, InitialController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
