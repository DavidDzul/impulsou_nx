import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';

import { CampusEnum } from './campus.entity';
import { User, Calendar } from './';

@ObjectType()
@Entity('generations')
export class Generation {
  @PrimaryGeneratedColumn({ unsigned: true })
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => Int)
  entryName: number;

  @Column({ type: 'enum', enum: CampusEnum })
  @Field(() => CampusEnum)
  campus: CampusEnum;

  @Column({ default: true })
  @Field()
  inProgress: boolean;

  @CreateDateColumn()
  @Field()
  createdAt: string;

  @UpdateDateColumn()
  @Field()
  updatedAt: string;

  /* Relationships */
  @OneToMany(() => User, (user) => user.generation)
  @Field(() => [User])
  users: User[];

  @OneToMany(() => Calendar, (map) => map.generation)
  @Field(() => [Calendar])
  calendar: Calendar[];
}
