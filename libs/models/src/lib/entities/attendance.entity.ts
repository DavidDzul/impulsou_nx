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

import { ReasonEmun } from './raeason-attendance.entity';
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

  @Column({ type: 'time' })
  @Field()
  checkIn: string;

  @Column({ type: 'time', nullable: true })
  @Field({ nullable: true })
  checkOut: string;

  @Column({ type: 'date' })
  @Field()
  recordDate: string;

  @Column({ default: false })
  @Field()
  delay: boolean;

  @Column({ default: false })
  @Field()
  justifiedDelay: boolean;

  @Column({ default: false })
  @Field()
  justifiedAbsence: boolean;

  @Column({ type: 'enum', enum: ReasonEmun, nullable: true })
  @Field(() => ReasonEmun, { nullable: true })
  reason?: ReasonEmun;

  @Column({ type: 'nvarchar', length: '10000' })
  @Field({ nullable: true })
  descripcion: string;

  @CreateDateColumn()
  @Field()
  createdAt: string;

  @UpdateDateColumn()
  @Field()
  updatedAt: string;

  /* Relationships */
  @ManyToOne(() => User, (user) => user.attendances)
  @Field(() => User)
  user: User;
}
