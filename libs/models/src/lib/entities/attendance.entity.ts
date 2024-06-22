import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';

import { CampusEnum } from './campus.entity';
import { User } from './';

@ObjectType()
@Entity('attendance')
export class Attendance {
  @PrimaryGeneratedColumn({ unsigned: true })
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => Int)
  userId: number;

  @Column({ type: 'datetime' })
  @Field()
  checkIn: string;

  @Column({ type: 'datetime', nullable: true })
  @Field({ nullable: true })
  checkOut: string;

  @Column({ default: false })
  @Field()
  late: boolean;

  @CreateDateColumn()
  @Field()
  createdAt: string;

  @UpdateDateColumn()
  @Field()
  updatedAt: string;

  /* Relationships */
  @ManyToOne(() => User, (user) => user.attendance)
  @Field(() => User)
  user: User;
}
