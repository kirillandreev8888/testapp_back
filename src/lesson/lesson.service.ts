import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from 'src/group/group.entity';
import { GroupService } from 'src/group/group.service';
import { Tutor } from 'src/tutor/tutor.entity';
import { TutorService } from 'src/tutor/tutor.service';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
    private readonly tutorService: TutorService,
    private readonly groupService: GroupService,
  ) {}

  findAll(): Promise<Lesson[]> {
    return this.lessonRepository
      .createQueryBuilder('lesson')
      .leftJoinAndSelect('lesson.group', 'group')
      .leftJoinAndSelect('lesson.tutor', 'tutor')
      .getMany();
  }

  async addLesson(
    info: string,
    tutor: Tutor,
    day: number,
    time: number,
    group: Group,
  ): Promise<Lesson> {
    const newLesson = this.lessonRepository.create({
      info,
      day,
      time,
      tutor,
      group,
    });
    // newLesson.tutor = tutor;
    // newLesson.group =group;
    // return newLesson;
    return this.lessonRepository.save(newLesson);
  }

  async editLesson(
    info: string,
    tutor: Tutor,
    id: number,
  ): Promise<Lesson> {
    const editedLesson: Lesson = await this.lessonRepository.findOne(id);
    editedLesson.info = info;
    editedLesson.tutor = tutor;
    // return newLesson;
    return this.lessonRepository.save(editedLesson);
  }

  async deleteLesson(id: number){
    await this.lessonRepository.delete({id: id})
  }
}
