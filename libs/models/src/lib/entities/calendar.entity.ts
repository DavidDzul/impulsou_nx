// NestJS Modules
import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
// Third-Party Libraries
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';

// Entities
import { Generation } from '.';
import { CampusEnum } from './campus.entity';

@ObjectType()
@Entity('calendar')
export class Calendar {
  @PrimaryGeneratedColumn({ unsigned: true })
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column({ unsigned: true })
  @Field(() => Int)
  generationId: number;

  @Column({ type: 'date' })
  @Field()
  date: string;

  @Column({ type: 'enum', enum: CampusEnum })
  @Field(() => CampusEnum)
  campus: CampusEnum;

  @CreateDateColumn()
  @Field()
  createdAt: string;

  @UpdateDateColumn()
  @Field()
  updatedAt: string;

  /* Relationships */
  @ManyToOne(() => Generation, (generation) => generation.calendar)
  @Field(() => Generation)
  generation: Generation;
}
