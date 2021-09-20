import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tutor } from './tutor.entity';
import { TutorService } from './tutor.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tutor])],
  providers: [TutorService],
  exports: [TutorService],
})
export class TutorModule {}
