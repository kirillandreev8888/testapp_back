import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupModule } from 'src/group/group.module';
import { TutorModule } from 'src/tutor/tutor.module';
import { Lesson } from './lesson.entity';
import { LessonService } from './lesson.service';

@Module({
  imports: [TypeOrmModule.forFeature([Lesson]), TutorModule, GroupModule],
  providers: [LessonService],
  exports: [LessonService],
})
export class LessonModule {}
