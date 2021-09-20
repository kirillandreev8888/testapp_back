import { Group } from 'src/group/group.entity';
import { Tutor } from 'src/tutor/tutor.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  info: string;

  @Column()
  day: number;

  @Column()
  time: number;

  @ManyToOne(() => Group,{
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  group: Group;

  @ManyToOne(() => Tutor)
  tutor: Tutor;
}
