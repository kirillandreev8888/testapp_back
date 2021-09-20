import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from 'src/group/group.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group) private groupRepository: Repository<Group>,
  ) {}

  findAll(): Promise<Group[]> {
    return this.groupRepository.find();
  }

  async findById(id: number): Promise<Group> {
    try {
      const group = await this.groupRepository.findOneOrFail({ id: id });
      return group;
    } catch (error) {
      return undefined;
    }
  }

  async addGroup(name: string): Promise<Group> {
    const newGroup = this.groupRepository.create({name})
    return this.groupRepository.save(newGroup);
  }
  async deleteGroup(id: number){
    await this.groupRepository.delete({id: id})
  }
}
