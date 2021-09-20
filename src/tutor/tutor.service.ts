import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tutor } from './tutor.entity';

@Injectable()
export class TutorService {
  constructor(
    @InjectRepository(Tutor) private tutorRepository: Repository<Tutor>,
  ) {}

  findAll(): Promise<Tutor[]> {
    return this.tutorRepository.find();
  }

  async findById(id: number): Promise<Tutor>{
      try {
          const tutor = await this.tutorRepository.findOneOrFail({id: id});
          return tutor;
      } catch (error) {
          return undefined;
      }
  }
}
