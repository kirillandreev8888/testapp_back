import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from 'src/group/group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Group])],
  providers: [GroupService],
  controllers: [],
  exports: [GroupService],
})
export class GroupModule {}
