import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tutor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
